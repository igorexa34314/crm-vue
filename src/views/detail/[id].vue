<template>
	<div>
		<loader v-if="loading" class="page-loader" />
		<div v-else-if="record">
			<v-breadcrumbs :items="breadcrumbs">
				<template v-slot:divider>
					<v-icon icon="mdi-chevron-right" />
				</template>
			</v-breadcrumbs>

			<v-row class="mt-4">
				<v-col cols="6" md="6" sm="12">
					<v-card class="pa-3" :color="record.type === 'outcome' ? 'orange-darken-4' : 'light-green-darken-2'">
						<v-card-text class="text-subtitle-1">
							<p>{{ $filters.localize('description') + ': ' + record.description }}</p>
							<p class="mt-3">{{ $filters.localize('amount') + ': ' + $filters.currency(record.amount) }}
							</p>
							<p class="mt-3 mb-5">{{ $filters.localize('category') + ': ' + record.category }}</p>
							<small class="text-right d-block mr-1">{{ $filters.date(record.date, 'datetime') }}</small>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</div>
		<div v-else class="mt-7 text-center text-deep-purple-darken-4 text-h6">
			<strong>
				Записи с id: <span class="text-decoration-underline font-italic">
					{{ route.params.id }}</span>
				не найдено
			</strong>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useLocalizeFilter } from '@/filters/localizeFilter';

const store = useStore();
const route = useRoute();

const loading = ref(true);
const record = ref(null);
const breadcrumbs = [
	{ title: useLocalizeFilter('menu.history'), to: '/history' },
];

onMounted(async () => {
	const id = route.params.id;
	const rec = await store.dispatch('record/fetchRecordById', id);
	const category = await store.dispatch('category/fetchCategoryById', rec.categoryId);
	record.value = { ...rec, category: category.title };
	breadcrumbs.push({ title: record.value.type === 'income' ? 'Доход' : 'Расход', disabled: true })
	loading.value = false;
});
</script>

<style lang="scss" scoped>
.page-loader {
	left: 50%;
	transform: translate(-50%);
}
</style>