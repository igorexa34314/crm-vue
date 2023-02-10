<template>
	<div>
		<div class="title d-flex flex-row align-center mb-3">
			<h3 class="text-h4 mt-4 ml-2 flex-grow-1">Планирование</h3>
			<h4 class="text-h4">{{ $filters.currency(info.bill, 'UAH') }}</h4>
		</div>
		<v-divider color="black" thickness="1.5" class="bg-white mb-8" />
		<loader v-if="loading" class="mt-10 page-loader" />

		<div v-else-if="!categories.length" class="mt-10 text-center text-h6">Категорий пока нет. <router-link
				to="/categories">Создать категорию</router-link></div>

		<section v-else class="mt-10 px-4">
			<div v-for="cat in categories" :key="cat.id" class="mt-8">
				<p class="d-flex flex-row align-center mb-3">
					<strong class="font-weight-bold mr-4">{{ cat.title }}:</strong>
					<span>{{ $filters.currency(cat.spend) }} из {{ $filters.currency(cat.limit) }}</span>

				</p>
				<v-progress-linear :model-value="cat.percent" :id="`progress-${cat.id}`"
					:color="cat.percent >= 90 ? 'red' : cat.percent >= 60 ? 'yellow' : 'green'" style="cursor: pointer;"
					rounded rounded-bar />
				<v-tooltip :activator="`#progress-${cat.id}`" location="bottom"
					:content-class="(cat.limit - cat.spend) < 0 ? 'bg-deep-orange-darken-3' : 'bg-light-green-darken-1'">
					{{((cat.limit - cat.spend) < 0 ? 'Превышение на ' : 'Осталось ') + $filters.currency(Math.abs(cat.limit
					- cat.spend)) }} </v-tooltip>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const info = computed(() => store.state.info.info);
const loading = ref(true);
const records = ref([]);
const categories = ref([]);

onMounted(async () => {
	records.value = await store.dispatch('record/fetchRecords');
	const cats = await store.dispatch('category/fetchCategories');
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
	})
	loading.value = false;
})
</script>

<style lang="scss" scoped>
.page-loader {
	left: 50%;
	transform: translate(-50%);
}
</style>