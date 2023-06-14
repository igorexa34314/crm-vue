<template>
	<div>
		<div class="subtitle">
			<h4 class="text-h5 mb-7">{{ t('create') }}</h4>
		</div>
		<v-form ref="form" @submit.prevent="submitHandler">
			<LocalizedInput v-model="formState.title" :rules="validations.title" variant="underlined" :label="t('title')"
				required />
			<LocalizedInput v-model.number="formState.limit" :rules="validations.limit" variant="underlined" type="number"
				:label="t('limit') + ` (${userCurrency})`" class="mt-6" required />
			<v-btn color="green-darken-3" type="submit" class="mt-7">
				{{ t('create') }}
				<v-icon :icon="mdiSend" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import LocalizedInput from '@/components/UI/LocalizedInput.vue';
import { mdiSend } from '@mdi/js';
import { createCategory, Category } from '@/api/category';

import { category as validations } from '@/utils/validations';
import { useInfoStore } from '@/stores/info';
import { VForm } from 'vuetify/components';

const emit = defineEmits<{
	(e: 'created', category: Category): void;
}>();

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { currencyFilter: cf } = useCurrencyFilter();
const { showMessage } = useSnackbarStore();
const DEFAULT_LIMIT = Math.floor(cf.value(50));

const { userCurrency } = storeToRefs(useInfoStore());
const form = ref<VForm>();
const formState = ref<Category>({
	title: '',
	limit: DEFAULT_LIMIT,
});

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
	if (valid) {
		try {
			const { limit, ...data } = formState.value
			const category = await createCategory({ ...data, limit: cf.value(limit, undefined, 'reverse') });
			if (category) {
				emit('created', category);
				form.value?.reset();
				formState.value.limit = DEFAULT_LIMIT;
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