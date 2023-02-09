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

		<div v-else-if="!records.length" class="text-center text-h6 mt-9">Записей пока нет. <router-link
				to="/record">Создать запись</router-link></div>

		<section v-else class="mt-8">
			<HistoryTable :records="records" />
		</section>
	</div>
</template>

<script setup>
import HistoryTable from '@/components/history/HistoryTable.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const loading = ref(true);
const records = ref([]);
const categories = ref([]);

onMounted(async () => {
	const rec = await store.dispatch('record/fetchRecords');
	categories.value = await store.dispatch('category/fetchCategories');
	records.value = rec.map(r => ({
		...r,
		category: categories.value.find(cat => cat.id === r.categoryId).title,
	}));
	loading.value = false;
});


</script>

<style lang="scss" scoped>
.page-loader {
	left: 50%;
	transform: translate(-50%);
}
</style>