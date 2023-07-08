<template>
	<div>
		<div class="title mb-7">
			<h3 class="text-h4 mt-4 ml-2">{{ t('pageTitles.categories') }}</h3>
		</div>
		<section class="mt-10">
			<app-loader v-if="isLoading" page />
			<v-row v-else :class="xs ? 'px-2' : 'px-4'">
				<v-col cols="6" md="6" sm="12" xs="12" class="create-category v-col-xs-12">
					<CreateCategory :default-limit="100" @created="addNewCategory"
						:class="{ 'pr-6': !smAndDown, 'px-3': smAndDown && !xs }" />
				</v-col>
				<v-col cols="6" md="6" sm="12" xs="12" class="edit-category v-col-xs-12">
					<EditCategory v-if="categories?.length" v-bind="{ categories, defaultLimit: 100 }"
						@updated="updateCategories" :class="{ 'pl-6': !smAndDown, 'px-3': smAndDown && !xs }" />
					<div class="text-h5 px-5 no-categories" v-else>Категорий пока нет</div>
				</v-col>
			</v-row>
		</section>
	</div>
</template>

<script setup lang="ts">
import CreateCategory from '@/components/categories/CreateCategory.vue';
import EditCategory from '@/components/categories/EditCategory.vue';
import { useMeta } from 'vue-meta';
import { useAsyncState } from '@vueuse/core';
import { fetchCategories, Category } from '@/services/category';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';

// Page title: Categories
useMeta({ title: 'pageTitles.categories' });

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { state: categories, isLoading } = useAsyncState(fetchCategories, []);
const { smAndDown, xs } = useDisplay();

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

<style scoped>
@media(max-width: 960px) {
	.edit-category {
		margin-top: 2rem;
	}
}
</style>