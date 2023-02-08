<template>
	<div>
		<div class="title mb-7">
			<h3 class="text-h4 mt-4 ml-2">Категории</h3>
		</div>
		<section class="mt-10">
			<loader v-if="loading" class="page-loader" />
			<v-row v-else class="px-4">
				<CreateCategory class="pr-6" @created="addNewCategory" />
				<EditCategory v-if="categories.length" :categories="categories" @updated="updateCategories" class="pl-6" />
				<div class="text-h5 px-5" v-else>Категорий пока нет</div>
			</v-row>
		</section>
	</div>
</template>

<script setup>
import CreateCategory from '@/components/categories/CreateCategory.vue';
import EditCategory from '@/components/categories/EditCategory.vue';
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue';

const store = useStore();

const loading = ref(true);
const categories = ref([]);

const addNewCategory = category => {
	categories.value.push(category);
};
onMounted(async () => {
	categories.value = await store.dispatch('category/fetchCategories');
	loading.value = false;
});
const updateCategories = category => {
	const index = categories.value.findIndex(c => c.id === category.id);
	categories.value[index].title = category.title;
	categories.value[index].limit = category.limit;
};
</script>

<style lang="scss" scoped>
.page-loader {
	left: 50%;
	transform: translate(-50%);
}
</style>