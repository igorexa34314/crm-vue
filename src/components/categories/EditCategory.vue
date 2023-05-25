<template>
	<div>
		<div class="subtitle">
			<h4 class="text-h5 mb-7">{{ t('edit') }}</h4>
		</div>
		<v-form ref="form" @submit.prevent="submitHandler">
			<v-select v-model="currentCategory.id" :items="categories" item-title="title" item-value="id"
				:label="t('select_category')" variant="underlined" />
			<LocalizedInput v-model="currentCategory.title" :rules="validations.title" variant="underlined"
				:label="t('title')" class="mt-6" required />
			<LocalizedInput v-model="currentCategory.limit" :rules="validations.limit" variant="underlined" type="number"
				:label="t('limit') + ` (${userCurrency})`" class="mt-6" required />
			<v-btn color="light-green-darken-4" type="submit" class="mt-7">
				{{ t('update') }}
				<v-icon :icon="mdiSend" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import LocalizedInput from '@/components/UI/LocalizedInput.vue';
import { ref, watch } from 'vue';
import { mdiSend } from '@mdi/js';
import { updateCategory, Category } from '@/api/category';
import { useSnackbarStore } from '@/stores/snackbar';
import { useI18n } from 'vue-i18n';
import { category as validations } from '@/utils/validations';
import { VForm } from 'vuetify/components';
import { useInfoStore } from '@/stores/info';
import { useCurrencyFilter } from '@/composables/useCurrencyFilter';
import { storeToRefs } from 'pinia';

const props = defineProps<{
	categories: Category[];
}>();
const emit = defineEmits<{
	(e: 'updated', cat: Category): void;
}>();


const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { showMessage } = useSnackbarStore();
const { currencyFilter: cf } = useCurrencyFilter();
const { userCurrency } = storeToRefs(useInfoStore());
const DEFAULT_LIMIT = Math.floor(cf.value(50));

const form = ref<VForm>();
const currentCategory = ref<Category>({
	id: props.categories[0].id,
	title: '',
	limit: DEFAULT_LIMIT
});

watch(() => currentCategory.value.id, (newId) => {
	const cat = props.categories.find(({ id }) => id === newId);
	if (cat) {
		const { limit, ...data } = cat;
		currentCategory.value = { ...data, limit: Math.round(cf.value(limit)) };
	}
}, { immediate: true });

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
	const { id, limit, ...categoryData } = currentCategory.value;
	if (valid && id) {
		try {
			await updateCategory(id, { ...categoryData, limit: cf.value(limit, undefined, 'reverse') });
			showMessage('Категория успешно обновлена');
			emit('updated', currentCategory.value);
		} catch (e) {
			showMessage('error_update_category');
		}
	}
}
</script>

<style lang="scss" scoped></style>