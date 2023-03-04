<template>
	<div>
		<div class="title d-flex flex-row align-center mb-3">
			<h3 class="text-h4 mt-4 ml-2 flex-grow-1">{{ useLocalizeFilter('pageTitles.plan') }}</h3>
			<h4 class="text-h4">{{ useCurrencyFilter(bill!, 'UAH') }}</h4>
		</div>
		<v-divider color="black" thickness="1.5" class="bg-white mb-8" />
		<app-loader v-if="loading" class="mt-10 page-loader" />

		<div v-else-if="categories && !categories.length" class="mt-10 text-center text-h6">{{
			useLocalizeFilter('pageTitles.plan')
		}}<router-link to="/categories">{{ useLocalizeFilter('no_categories') + '. ' }}</router-link></div>

		<section v-else class="mt-10 px-4">
			<div v-for="(cat, index) of categories" :key="cat.id || index" class="mt-8">
				<p class="d-flex flex-row align-center mb-3">
					<strong class="font-weight-bold mr-4">{{ cat.title }}:</strong>
					<span>
						{{
							useCurrencyFilter(cat.spend) + ' ' + useLocalizeFilter('out_of') + ' ' +
							useCurrencyFilter(cat.limit)
						}}
					</span>
				</p>
				<v-progress-linear :model-value="cat.percent" :id="`progress-${cat.id}`"
					:color="cat.percent >= 90 ? 'red' : cat.percent >= 60 ? 'yellow' : 'green'" style="cursor: pointer;" rounded
					rounded-bar />
				<v-tooltip :activator="`#progress-${cat.id}`" location="bottom"
					:content-class="(cat.limit - cat.spend) < 0 ? 'bg-deep-orange-darken-3' : 'bg-light-green-darken-1'">
					{{ ((cat.limit - cat.spend) < 0 ? useLocalizeFilter('exceeding') : useLocalizeFilter('left')) + ' ' +
						useCurrencyFilter(Math.abs(cat.limit - cat.spend)) }} </v-tooltip>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useCurrencyFilter } from '@/filters/currencyFilter';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useCategory } from '@/composables/category';
import type { Record } from '@/composables/record';
import type { Category } from '@/composables/category';
import { useRecord } from '@/composables/record';
import { ref, computed, onMounted } from 'vue';
import { useMeta } from 'vue-meta';
import { useInfoStore } from '@/stores/info';

useMeta({ title: 'pageTitles.plan' });

const infoStore = useInfoStore();
const { fetchCategories } = useCategory();
const { fetchRecords } = useRecord();

const bill = computed(() => {
	if (infoStore.info && infoStore.info.bill)
		return infoStore.info.bill
});
const loading = ref(true);
const records = ref<Record[]>([]);

interface CategoryStats extends Category {
	percent: number;
	spend: number;
}
const categories = ref<CategoryStats[]>();

onMounted(async () => {
	records.value = await fetchRecords();
	const cats = await fetchCategories() as Category[];
	categories.value = cats.map(cat => {
		const spend = records.value.filter(r => r.categoryId === cat.id)
			.filter(r => r.type === 'outcome')
			.reduce((sum, r) => sum += +r.amount, 0);
		const percent = ((100 * spend / cat.limit) > 100) ? 100 : (100 * spend / cat.limit);
		return {
			...cat,
			percent,
			spend,
		}
	});
	loading.value = false;
})
</script>

<style lang="scss" scoped>
.page-loader {
	left: 50%;
	transform: translate(-50%);
}
</style>