<template>
	<v-form ref="form" v-if="formState.categoryId" @submit.prevent="submitHandler" class="record-form mt-8"
		:class="xs ? 'px-2' : 'px-4'">
		<v-select v-model="formState.categoryId" :items="categories" item-title="title" item-value="id"
			:label="t('select_category')" variant="underlined" />

		<v-radio-group class="mt-3" v-model="formState.type">
			<v-radio :label="t('income')" value="income" density="comfortable" color="orange-accent-3" />
			<v-radio :label="t('outcome')" value="outcome" density="comfortable" color="orange-accent-3" />
		</v-radio-group>

		<LocalizedInput v-model.number="formState.amount" :rules="validations.amount" type="number" variant="underlined"
			:label="t('amount') + ` (${info?.currency})`" class="mt-2" required />

		<LocalizedTextarea v-model="formState.description" :rules="validations.description" variant="underlined"
			:label="t('description')" class="mt-2" rows="1" auto-grow />

		<v-btn type="submit" color="light-blue-darken-4" :class="xs ? 'mt-4' : 'mt-7'">
			{{ t('create') }}
			<v-icon :icon="mdiSend" class="ml-3" />
		</v-btn>
	</v-form>
</template>

<script setup lang="ts">
import LocalizedTextarea from '@/components/UI/LocalizedTextarea.vue';
import LocalizedInput from '@/components/UI/LocalizedInput.vue';
import { mdiSend } from '@mdi/js';
import { ref, computed, watchEffect } from 'vue';
import { Record } from '@/services/record';
import { VForm } from 'vuetify/components';
import { useSnackbarStore } from '@/stores/snackbar';
import { useCurrencyFilter } from '@/composables/useCurrencyFilter';
import { useI18n } from 'vue-i18n';
import { record as validations } from '@/utils/validations';
import { Category } from '@/services/category';
import { useInfoStore } from '@/stores/info';
import { useDisplay } from 'vuetify';

const props = withDefaults(defineProps<{
	categories: Category[],
	defaultAmount?: number,
	defaultType?: Record['type'],
}>(), {
	defaultAmount: 100,
	defaultType: 'outcome'
});

const emit = defineEmits<{
	(e: 'createRecord', data: Omit<Record, 'date'>): void;
}>();
const { showMessage } = useSnackbarStore();
const { t, n } = useI18n({ inheritLocale: true, useScope: 'global' });
const { currencyFilter: cf } = useCurrencyFilter();
const infoStore = useInfoStore();
const { xs } = useDisplay();

const info = computed(() => infoStore.info);

const form = ref<VForm>();

const formState = ref<Omit<Record, 'date'>>({
	amount: Math.round(cf.value(props.defaultAmount) / 100) * 100,
	description: '',
	type: 'income',
	categoryId: props.categories[0].id
});

watchEffect(() => {
	formState.value.categoryId = props.categories[0].id;
	formState.value.amount = Math.round(cf.value(props.defaultAmount) / 100) * 100;
});
const canCreateRecord = computed(() => {
	return formState.value.type === 'income' ? true : cf.value(info.value!.bill) >= formState.value.amount;
});

const submitHandler = async () => {
	if (canCreateRecord.value) {
		const valid = (await form.value?.validate())?.valid;
		if (valid) {
			const { amount, ...data } = formState.value;
			emit('createRecord', { ...data, amount: cf.value(amount, undefined, 'reverse') })
			resetForm();
		}
		else {
			showMessage(t('lack_of_amount') +
				` (${n(formState.value.amount - cf.value(info.value!.bill), 'currency', info.value?.currency || import.meta.env.VITE_APP_DEFAULT_CURRENCY || 'USD')})`);
		}
	}
}
const resetForm = () => {
	formState.value.description = '';
	formState.value.amount = Math.round(cf.value(props.defaultAmount) / 100) * 100;
}
</script>
