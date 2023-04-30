<template>
	<div>
		<app-loader v-if="isLoading" page />
		<div v-else-if="recordWithCategory">
			<v-breadcrumbs :items="breadcrumbs">
				<template #divider>
					<v-icon :icon="mdiChevronRight" />
				</template>
			</v-breadcrumbs>

			<v-row class="mt-4">
				<v-col cols="6" md="6" sm="12">
					<v-card class="pa-3"
						:color="recordWithCategory.type === 'outcome' ? 'orange-darken-4' : 'light-green-darken-2'">
						<v-card-text class="text-subtitle-1">
							<p>{{ useLocalizeFilter('description') + ': ' + recordWithCategory.description }}</p>
							<p class="mt-3">{{ useLocalizeFilter('amount') + ': ' + useCurrencyFilter(recordWithCategory.amount)
							}}
							</p>
							<p class="mt-3 mb-5">{{ useLocalizeFilter('category') + ': ' + recordWithCategory.category }}</p>
							<small class="text-right d-block mr-1">{{ useDateFilter(recordWithCategory.date, 'datetime')
							}}</small>
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

<script setup lang="ts">
import { ref, computed } from 'vue';
import { computedAsync } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { useMeta } from 'vue-meta';
import { mdiChevronRight } from '@mdi/js';
import { fetchCategoryById } from '@/api/category';
import { fetchRecordById, Record } from '@/api/record';
import { useCurrencyFilter } from '@/filters/currencyFilter';
import { useDateFilter } from '@/filters/dateFilter';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useSnackbarStore } from '@/stores/snackbar';

interface Breadcrumbs {
	title: string;
	to?: string;
	disabled?: boolean
}
interface RecordWithCategoryName extends Record {
	category: string;
}

const route = useRoute();
const { showMessage } = useSnackbarStore();
useMeta({ title: 'pageTitles.details' });

const isLoading = ref(false);
const breadcrumbs = computed<Breadcrumbs[]>(() => ([
	{ title: useLocalizeFilter('menu.history'), to: '/history' },
	{ title: recordWithCategory.value?.type === 'income' ? 'Доход' : 'Расход', disabled: true }
].filter(Boolean)));

const recordWithCategory = computedAsync(async () => {
	if (route.params.id) {
		const recById = await fetchRecordById(route.params.id as string);
		const category = await fetchCategoryById(recById?.categoryId);
		return { ...recById, category: category?.title || '' } as RecordWithCategoryName;
	}
}, undefined, {
	evaluating: isLoading,
	onError: (e) => showMessage('no_record_found')
});
</script>

<style lang="scss" scoped></style>