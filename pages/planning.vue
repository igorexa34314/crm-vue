<template>
	<div>
		<div class="title d-flex flex-row align-center mb-3">
			<h3 class="text-h4 mt-4 ml-2 flex-grow-1">{{ t('pageTitles.plan') }}</h3>
			<h4 class="text-h4">{{ n(cf(bill!), 'currency', userCurrency) }}</h4>
		</div>
		<v-divider color="black" thickness="1.5" class="bg-white mb-8" />
		<app-loader v-if="isLoading" class="mt-10" page />
		<div v-else-if="catStats && !catStats.length" class="mt-10 text-center text-h6">{{
			t('pageTitles.plan')
		}}<router-link to="/categories">{{ t('no_categories') + '. ' }}</router-link></div>
		<section v-else class="mt-10 px-4">
			<div v-for="(cat, index) of catStats" :key="cat.id || index" class="mt-8">
				<p class="d-flex flex-row align-center justify-space-between mb-3">
					<strong class="font-weight-bold mr-4">{{ cat.title }}:</strong>
					<span class="mr-4">
						{{
							n(cf(cat.spend), 'currency', userCurrency) + ' ' + t('out_of') + ' ' +
							n(cf(cat.limit), 'currency', userCurrency)
						}}
					</span>
				</p>
				<v-progress-linear :model-value="cat.percent" :id="`progress-${cat.id}`"
					:color="cat.percent >= 90 ? 'red' : cat.percent >= 60 ? 'yellow' : 'green'" style="cursor: pointer;" rounded
					rounded-bar />
				<v-tooltip :activator="`#progress-${cat.id}`" location="bottom"
					:content-class="(cat.limit - cat.spend) < 0 ? 'bg-deep-orange-darken-3' : 'bg-light-green-darken-1'">
					{{ ((cat.limit - cat.spend) < 0 ? t('exceeding') : t('left')) + ' ' + n(Math.abs(cf(cat.limit) -
						cf(cat.spend)), 'currency', userCurrency) }} </v-tooltip>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { fetchCategories, Category } from '@/api/category';
import { fetchRecords } from '@/api/record';
import messages from '@/utils/fbMessages.json';

definePageMeta({ middleware: ['auth'] });
useHead({ title: 'pageTitles.plan' });

const { t, n } = useI18n({ inheritLocale: true, useScope: 'global' });
const infoStore = useInfoStore();

const { userCurrency } = storeToRefs(infoStore);
const { currencyFilter: cf } = useCurrencyFilter();

const bill = computed(() => infoStore.info?.bill || 1000);
const isLoading = ref(false);

interface CategoryStats extends Category {
	percent: number;
	spend: number;
}
const catStats = ref<CategoryStats[]>();
try {
	isLoading.value = true;
	const records = await fetchRecords();
	const cats = await fetchCategories();
	if (cats && records) {
		catStats.value = cats.map(cat => {
			const spend = records.filter(r => r.categoryId === cat.id)
				.filter(r => r.type === 'outcome')
				.reduce((sum, r) => sum += +r.amount, 0);
			const percent = ((100 * spend / cat.limit) > 100) ? 100 : (100 * spend / cat.limit);
			return {
				...cat,
				percent,
				spend,
			}
		});
	}
} catch (e) {
	const { showMessage } = useSnackbarStore();
	showMessage(messages[e as keyof typeof messages] || e as string);
} finally {
	isLoading.value = false;
}
</script>

<style lang="scss" scoped></style>