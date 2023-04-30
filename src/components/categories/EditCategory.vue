<template>
	<v-col cols="6" md="6" sm="12">
		<div>
			<div class="subtitle">
				<h4 class="text-h5 mb-7">{{ useLocalizeFilter('edit') }}</h4>
			</div>
			<v-form ref="form" @submit.prevent="submitHandler">
				<v-select v-model="currentCategory.id" :items="categories" item-title="title" item-value="id"
					:label="useLocalizeFilter('select_category')" variant="underlined" />
				<v-text-field v-model="currentCategory.title" :rules="validations.title" variant="underlined"
					:label="useLocalizeFilter('title')" class="mt-6" required />
				<v-text-field v-model="currentCategory.limit" :rules="validations.limit" variant="underlined" type="number"
					:label="useLocalizeFilter('limit')" class="mt-6" required />
				<v-btn color="light-green-darken-4" type="submit" class="mt-7">
					{{ useLocalizeFilter('update') }}
					<v-icon :icon="mdiSend" class="ml-3" />
				</v-btn>
			</v-form>
		</div>
	</v-col>
</template>

<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue';
import { mdiSend } from '@mdi/js';
import { updateCategory, Category } from '@/api/category';
import { useSnackbarStore } from '@/stores/snackbar';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { category as validations } from '@/utils/validations';
import { VForm } from 'vuetify/components';

const { showMessage } = useSnackbarStore();

const props = defineProps<{
	categories: Category[];
}>();
const emit = defineEmits<{
	(e: 'updated', cat: Category): void;
}>();

const form = ref<VForm>();
const currentCategory: Category = reactive({
	id: props.categories[0].id,
	title: '',
	limit: 1
});

watchEffect(() => {
	const cat = props.categories.find(c => c.id === currentCategory.id);
	if (cat) {
		currentCategory.title = cat.title;
		currentCategory.limit = cat.limit;
	}
});

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
	const { id, ...categoryData } = currentCategory;
	if (valid && id) {
		try {
			await updateCategory(id, categoryData);
			showMessage('Категория успешно обновлена');
			emit('updated', { id, ...categoryData });
		} catch (e) {
			showMessage('error_update_category');
		}
	}
}
</script>

<style lang="scss" scoped></style>