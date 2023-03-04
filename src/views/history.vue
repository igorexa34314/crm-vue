<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">{{ useLocalizeFilter('pageTitles.history') }}</h3>
		</div>
		<v-divider color="black" thickness="1.5" class="bg-white mt-3 mb-6" />

		<div class="history-chart" v-if="!loading">
			<Pie :options="chartOptions" :data="chrtData" />
		</div>

		<app-loader v-if="loading" class="mt-7 page-loader" />

		<div v-else-if="!pagedRecords.length" class="text-center text-h6 mt-9">
			{{ useLocalizeFilter('no_records') + '. ' }}
			<router-link to="/record">{{ useLocalizeFilter('create_record') }}</router-link>
		</div>

		<section v-else class="mt-6">
			<HistoryTable :records="pagedRecords" />

			<v-pagination v-model="page" @update:modelValue="pageChangeHandler" :length="pageCount" :total-visible="4"
				class="mt-4" density="comfortable" />
		</section>
	</div>
</template>

<script setup lang="ts">
import HistoryTable from '@/components/history/HistoryTable.vue';
import { ref, reactive, onMounted } from 'vue';
import { useCategory } from '@/composables/category';
import type { Record } from '@/composables/record';
import { useRecord } from '@/composables/record';
import { usePagination } from '@/composables/pagination';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { randomColor } from 'randomcolor';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import type { ChartData } from 'chart.js';
import { useMeta } from 'vue-meta';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

useMeta({ title: 'pageTitles.history' });

const { fetchCategories } = useCategory();
const { fetchRecords } = useRecord();

const loading = ref(true);
const records = ref<Record[]>([]);

const chrtData: ChartData = reactive({
	labels: [],
	datasets: [
		{ data: [], backgroundColor: [], borderColor: '#8D6E63' }
	]
});
const chartOptions = ref({
	responsive: true,
	plugins: {
		legend: {
			position: 'left',
			align: 'center',
			labels: {
				boxHeight: '30',
				font: {
					weight: 'bold',
					size: '16px'
				}
			}
		},
		title: {
			display: true,
			text: useLocalizeFilter('chart_title'),
			color: '#D50000',
			font: {
				size: '22px',
				lineHeight: '1.5'
			}
		}
	}
});

const { initPagination, page, pageCount, pageChangeHandler, items: pagedRecords } = usePagination();

onMounted(async () => {
	records.value = await fetchRecords();
	const categories = await fetchCategories();

	chrtData.labels = categories.map(c => c.title);
	chrtData.datasets[0].data = categories.map(c => {
		return records.value.reduce((acc, r) => {
			if (r.categoryId === c.id && r.type === 'outcome') {
				acc += +r.amount;
			}
			return acc;
		}, 0)
	});
	chrtData.datasets[0].backgroundColor = randomColor({ count: chrtData.datasets[0].data.length || 1 })

	initPagination(records.value.map(r => ({
		...r,
		category: categories.find(cat => cat.id === r.categoryId).title,
	})));

	loading.value = false;
});
</script>

<style lang="scss" scoped>
.page-loader {
	left: 50%;
	transform: translate(-50%);
}
.history-chart {
	margin: 0 auto;
	max-width: 550px;
}
</style>