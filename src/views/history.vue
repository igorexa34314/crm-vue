<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">История записей</h3>
		</div>
		<v-divider color="black" thickness="1.5" class="bg-white mt-3 mb-6" />

		<div class="history-chart" v-if="!loading">
			<canvas></canvas>
		</div>

		<loader v-if="loading" class="mt-7 page-loader" />

		<div v-else-if="!pagedRecords.length" class="text-center text-h6 mt-9">Записей пока нет. <router-link
				to="/record">Создать запись</router-link></div>

		<section v-else class="mt-8">
			<HistoryTable :records="pagedRecords" />

			<v-pagination v-model="page" @update:modelValue="pageChangeHandler" :length="pageCount" :total-visible="4"
				class="mt-4" />
		</section>
	</div>
</template>

<script setup>
import HistoryTable from '@/components/history/HistoryTable.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { usePagination } from '@/composables/pagination';

const store = useStore();

const loading = ref(true);
const records = ref([]);

const { initPagination, page, pageCount, pageChangeHandler, items: pagedRecords } = usePagination();

onMounted(async () => {
	records.value = await store.dispatch('record/fetchRecords');
	const categories = await store.dispatch('category/fetchCategories');
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
</style>