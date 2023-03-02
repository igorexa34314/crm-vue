<template>
	<div>
		<div class="title mb-7">
			<h3 class="text-h4 mt-4 ml-2">{{ useLocalizeFilter('pageTitles.categories') }}</h3>
		</div>
		<section class="mt-10">
			<app-loader v-if="loading" class="page-app-loader" />
			<v-row v-else class="px-4">
				<CreateCategory class="pr-6" @created="addNewCategory" />
				<EditCategory v-if="categories.length" :categories="categories" @updated="updateCategories" class="pl-6" />
				<div class="text-h5 px-5" v-else>Категорий пока нет</div>
			</v-row>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useLocalizeFilter } from '@/filters/localizeFilter';
import CreateCategory from '@/components/categories/CreateCategory.vue';
import EditCategory from '@/components/categories/EditCategory.vue';
import { useCategory } from '@/composables/category';
import type { Category } from '@/composables/category';
import { ref, onMounted } from 'vue';
import { useMeta } from 'vue-meta';

useMeta({ title: 'pageTitles.categories' });

const { fetchCategories } = useCategory();

const loading = ref(true);
const categories = ref<Category[]>([]);

const addNewCategory = (category: Category) => {
	categories.value.push(category);
};
onMounted(async () => {
	categories.value = await fetchCategories();
	loading.value = false;
});
const updateCategories = (category: Category) => {
	const index = categories.value.findIndex(c => c.id === category.id);
	categories.value[index].title = category.title;
	categories.value[index].limit = category.limit;
};
</script>

<style lang="scss" scoped>
.page-app-loader {
	left: 50%;
	transform: translate(-50%);
}
</style>