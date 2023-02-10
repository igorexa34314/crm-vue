<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">История записей</h3>
		</div>
		<v-divider color="black" thickness="1.5" class="bg-white mt-3 mb-6" />

		<div class="history-chart" v-if="!loading">
			<Pie :options="chartOptions" :data="chartData" />
		</div>

		<loader v-if="loading" class="mt-7 page-loader" />

		<div v-else-if="!pagedRecords.length" class="text-center text-h6 mt-9">Записей пока нет. <router-link
				to="/record">Создать запись</router-link></div>

		<section v-else class="mt-6">
			<HistoryTable :records="pagedRecords" />

			<v-pagination v-model="page" @update:modelValue="pageChangeHandler" :length="pageCount" :total-visible="4"
				class="mt-4" density="comfortable" />
		</section>
	</div>
</template>

<script setup>
import HistoryTable from '@/components/history/HistoryTable.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { usePagination } from '@/composables/pagination';
import { Pie, Chart } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { randomColor } from 'randomcolor';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const store = useStore();

const loading = ref(true);
const records = ref([]);

const chartData = ref({
	labels: [],
	datasets: [
		{
			data: [], backgroundColor: [], borderColor: '#8D6E63'
		}]
});
const chartOptions = ref({
	responsive: true,
	plugins: {
		legend: {
			position: 'left',
			align: 'center',
			labels: {
				// boxWidth: '70',
				boxHeight: '30',
				font: {
					weight: 'bold',
					size: '16px'
				}
			}
		},
		title: {
			display: true,
			text: 'График ваших расходов',
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
	records.value = await store.dispatch('record/fetchRecords');
	const categories = await store.dispatch('category/fetchCategories');

	chartData.value.labels = categories.map(c => c.title);
	chartData.value.datasets[0].data = categories.map(c => {
		return records.value.reduce((acc, r) => {
			if (r.categoryId === c.id && r.type === 'outcome') {
				acc += +r.amount;
			}
			return acc;
		}, 0)
	});
	chartData.value.datasets[0].backgroundColor = randomColor({ count: chartData.value.datasets[0].data.length || 1 })

	records.value = initPagination(records.value.map(r => ({
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