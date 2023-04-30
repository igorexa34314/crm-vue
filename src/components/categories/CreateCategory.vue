<template>
	<v-col cols="6" md="6" sm="12">
		<div>
			<div class="subtitle">
				<h4 class="text-h5 mb-7">{{ useLocalizeFilter('create') }}</h4>
			</div>
			<v-form ref="form" @submit.prevent="submitHandler">
				<v-text-field v-model="formState.title" :rules="validations.title" variant="underlined"
					:label="useLocalizeFilter('title')" required />
				<v-text-field v-model.number="formState.limit" :rules="validations.limit" variant="underlined" type="number"
					:label="useLocalizeFilter('limit')" class="mt-6" required />
				<v-btn color="green-darken-3" type="submit" class="mt-7">
					{{ useLocalizeFilter('create') }}
					<v-icon :icon="mdiSend" class="ml-3" />
				</v-btn>
			</v-form>
		</div>
	</v-col>
</template>

<script setup lang="ts">
import { mdiSend } from '@mdi/js';
import { ref, reactive } from 'vue';
import { createCategory, Category } from '@/api/category';
import { useSnackbarStore } from '@/stores/snackbar';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { category as validations } from '@/utils/validations';
import { VForm } from 'vuetify/components';

const emit = defineEmits<{
	(e: 'created', category: Category): void;
}>();

const { showMessage } = useSnackbarStore();

const form = ref<VForm>();
const formState: Category = reactive({
	title: '',
	limit: 100,
});

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
	if (valid) {
		try {
			const category = await createCategory(formState);
			if (category) {
				emit('created', category);
				form.value?.reset();
				formState.limit = 100;
				showMessage('Категория создана');
			}
			else {
				throw new Error('category undefined');
			}
		} catch (e) {
			showMessage('error_create_category');
		}
	}
}
</script>

<style lang="scss" scoped></style>