<template>
	<div>
		<div class="title mb-7">
			<h3 class="text-h4 mt-4 ml-2">{{ useLocalizeFilter('pageTitles.categories') }}</h3>
		</div>
		<section class="mt-10">
			<app-loader v-if="isLoading" page />
			<v-row v-else class="px-4">
				<CreateCategory class="pr-6" @created="addNewCategory" />
				<EditCategory v-if="categories?.length" :categories="categories" @updated="updateCategories" class="pl-6" />
				<div class="text-h5 px-5" v-else>Категорий пока нет</div>
			</v-row>
		</section>
	</div>
</template>

<script setup lang="ts">
import CreateCategory from '@/components/categories/CreateCategory.vue';
import EditCategory from '@/components/categories/EditCategory.vue';
import { useMeta } from 'vue-meta';
import { useAsyncState } from '@vueuse/core';
import { fetchCategories, Category } from '@/api/category';
import { useLocalizeFilter } from '@/filters/localizeFilter';

// Page title: Categories
useMeta({ title: 'pageTitles.categories' });

const { state: categories, isLoading } = useAsyncState(fetchCategories, []);
const addNewCategory = (cat: Category) => {
	if (categories.value) {
		categories.value = [...categories.value, cat];
	}
	else {
		categories.value = [cat];
	}
};
const updateCategories = ({ id, title, limit }: Category) => {
	categories.value = categories.value?.map(cat => cat.id === id ? { id, title, limit } : cat);
};
</script>

<style lang="scss" scoped></style>