<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">{{ useLocalizeFilter('pageTitles.history') }}</h3>
		</div>
		<v-divider color="black" thickness="1.5" class="bg-white mt-3 mb-6" />

		<div class="history-chart" v-if="!isLoading && pagedRecords">
			<Pie :options="chartOptions" :data="chartData" />
		</div>

		<app-loader v-if="isLoading" class="mt-7" page />

		<div v-else-if="!pagedRecords || !pagedRecords.length" class="text-center text-h6 mt-9">
			{{ useLocalizeFilter('no_records') + '. ' }}
			<router-link to="/record">{{ useLocalizeFilter('create_record') }}</router-link>
		</div>

		<section v-else class="mt-6">
			<HistoryTable :records="pagedRecords" />

			<v-pagination v-if="pageCount > 1" v-model="page" @update:modelValue="pageChangeHandler" :length="pageCount"
				:total-visible="4" class="mt-4" density="comfortable" />
		</section>
	</div>
</template>

<script setup lang="ts">
import HistoryTable from '@/components/history/HistoryTable.vue';
import { ref, reactive, computed, watchEffect } from 'vue';
import { useMeta } from 'vue-meta';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { chartData as chartDataConfig, chartOptions } from '@/utils/chartjs';
import { Category, fetchCategories } from '@/api/category';
import { Record, fetchRecords } from '@/api/record';
import { usePagination } from '@/composables/pagination';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useSnackbarStore } from '@/stores/snackbar';
// @ts-ignore
import { randomColor } from 'randomcolor';

export type RecordWithCategory = Record & { category: Category['title'] };

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

useMeta({ title: 'pageTitles.history' });
const records = ref<Record[]>();
const categories = ref<Category[]>();
const isLoading = ref(false);
const { showMessage } = useSnackbarStore();

const chartData = reactive({ ...chartDataConfig });
const fillChartData = () => {
	if (categories.value && records.value) {
		chartData.labels = categories.value.map(c => c.title);
		chartData.datasets[0].data = categories.value.map(c => {
			return records.value?.reduce((acc, r) => {
				if (r.categoryId === c.id && r.type === 'outcome') {
					acc += +r.amount;
				}
				return acc;
			}, 0)
		}) as number[];
		chartData.datasets[0].backgroundColor = randomColor({ count: chartData.datasets[0].data.length || 1 })
	}
};

// Init History table pagination
const { initPagination, page, pageCount, pageChangeHandler, items: pagedRecords } = usePagination();
const recordsWithCategory = computed(() => records.value?.map(r => ({
	...r,
	category: categories.value?.find(cat => cat.id === r.categoryId)?.title,
}) as RecordWithCategory));
watchEffect(() => {
	if (recordsWithCategory.value) {
		initPagination(recordsWithCategory.value);
	}
});

try {
	isLoading.value = true;
	records.value = await fetchRecords();
	categories.value = await fetchCategories();
	fillChartData();
} catch (e) {
	showMessage('error_loading_records_or_categories');
}
finally {
	isLoading.value = false;
}





</script>

<style lang="scss" scoped>
.history-chart {
	margin: 0 auto;
	max-width: 550px;
}
</style>