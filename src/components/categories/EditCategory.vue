<template>
	<v-col cols="6" md="6" sm="12">
		<div>
			<div class="subtitle">
				<h4 class="text-h5 mb-7">{{ useLocalizeFilter('edit') }}</h4>
			</div>
			<v-form ref="form" v-model="valid" @submit.prevent="submitHandler">
				<v-select v-model="currentCategoryId" :items="categories" item-title="title" item-value="id"
					:label="useLocalizeFilter('select_category')" variant="underlined" />

				<v-text-field v-model="title" :rules="validations.title" variant="underlined"
					:label="useLocalizeFilter('title')" class="mt-6" required />

				<v-text-field v-model="limit" :rules="validations.limit" variant="underlined" type="number"
					:label="useLocalizeFilter('limit')" class="mt-6" required />

				<v-btn color="light-green-darken-4" type="submit" class="mt-7">
					{{ useLocalizeFilter('update') }}
					<v-icon icon="mdi-send" class="ml-3" />
				</v-btn>
			</v-form>
		</div>
	</v-col>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { PropType } from 'vue';
import { useCategory } from '@/composables/category';
import type { Category } from '@/composables/category';
import { useSnackbarStore } from '@/stores/snackbar';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { category as validations } from '@/utils/validations';

const { updateCategory } = useCategory();
const { showMessage } = useSnackbarStore();

const props = defineProps({
	categories: {
		type: Array as PropType<Category[]>,
		required: true,
	}
})
const emit = defineEmits<{
	(e: 'updated', cat: Category): void
}>();

const currentCategoryId = ref(props.categories[0].id);

const form = ref();
const valid = ref(true);
const title = ref(props.categories[0].title);
const limit = ref(props.categories[0].limit);

watch(currentCategoryId, catId => {
	const cat = props.categories.find(c => c.id === catId)
	title.value = cat!.title;
	limit.value = cat!.limit;
})

const submitHandler = async () => {
	const { valid } = await form.value.validate();

	if (valid) {
		try {
			const categoryData = {
				title: title.value,
				limit: limit.value,
			};
			await updateCategory(currentCategoryId.value!, categoryData);
			showMessage('Категория успешно обновлена');
			emit('updated', categoryData);
		} catch (e) { }
	}
}
</script>

<style lang="scss" scoped></style>