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
			<v-btn color="light-green-darken-4" type="submit" :class="xs ? 'mt-4' : 'mt-7'">
				{{ t('update') }}
				<v-icon :icon="mdiSend" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import LocalizedInput from '@/components/UI/LocalizedInput.vue';
import { ref, watchEffect } from 'vue';
import { mdiSend } from '@mdi/js';
import { updateCategory, Category } from '@/services/category';
import { useSnackbarStore } from '@/stores/snackbar';
import { useI18n } from 'vue-i18n';
import { category as validations } from '@/utils/validations';
import { VForm } from 'vuetify/components';
import { useInfoStore } from '@/stores/info';
import { useCurrencyFilter } from '@/composables/useCurrencyFilter';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify';

const props = withDefaults(defineProps<{
	categories: Category[];
	defaultLimit?: number
}>(), {
	defaultLimit: 100
});

const emit = defineEmits<{
	(e: 'updated', cat: Category): void;
}>();

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { showMessage } = useSnackbarStore();
const { currencyFilter: cf } = useCurrencyFilter();
const { xs } = useDisplay();
const { userCurrency } = storeToRefs(useInfoStore());

const form = ref<VForm>();
const currentCategory = ref<Category>({
	id: props.categories[0].id,
	title: '',
	limit: Math.round(cf.value(props.defaultLimit) / 100) * 100
});

watchEffect(() => {
	const cat = props.categories.find(({ id }) => id === currentCategory.value.id);
	if (cat) {
		const { limit, ...data } = cat;
		currentCategory.value = { ...data, limit: Math.round(cf.value(limit)) };
	}
});

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

<style scoped></style>