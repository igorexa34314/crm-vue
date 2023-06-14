<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">{{ t('pageTitles.newRecord') }}</h3>
		</div>

		<app-loader v-if="isLoading" class="mt-10" page />

		<div v-else-if="!categories?.length" class="mt-10 text-center text-h6">
			{{ t('no_categories') + '. ' }}
			<router-link to="/categories">{{ t('create_category') }}</router-link>
		</div>

		<v-form v-else ref="form" @submit.prevent="submitHandler" class="record-form mt-8 px-4">
			<v-select v-model="currentCategoryId" :items="categories" item-title="title" item-value="id"
				:label="t('select_category')" variant="underlined" />

			<v-radio-group class="mt-3" v-model="formState.type">
				<v-radio :label="t('income')" value="income" density="comfortable" color="orange-accent-3" />
				<v-radio :label="t('outcome')" value="outcome" density="comfortable" color="orange-accent-3" />
			</v-radio-group>

			<LocalizedInput v-model.number="formState.amount" :rules="validations.amount" type="number" variant="underlined"
				:label="t('amount') + ` (${info?.currency})`" class="mt-2" required />

			<LocalizedInput v-model="formState.description" :rules="validations.description" variant="underlined"
				:label="t('description')" class="mt-2" />

			<v-btn type="submit" color="light-blue-darken-4" class="mt-7">
				{{ t('create') }}
				<v-icon :icon="mdiSend" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import LocalizedInput from '@/components/UI/LocalizedInput.vue';
import { ref, computed } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useMeta } from 'vue-meta';
import { mdiSend } from '@mdi/js';
import { useI18n } from 'vue-i18n';
import { useInfoStore } from '@/stores/info';
import { updateInfo } from '@/api/user';
import { useSnackbarStore } from '@/stores/snackbar';
import { Category, fetchCategories } from '@/api/category';
import { createRecord, Record } from '@/api/record';
import { record as validations } from '@/utils/validations';
import { useCurrencyFilter } from '@/composables/useCurrencyFilter';
import { VForm } from 'vuetify/components';
import messages from '@/utils/fbMessages.json';

useMeta({ title: 'pageTitles.newRecord' });

const { t, n } = useI18n({ inheritLocale: true, useScope: 'global' });
const { showMessage } = useSnackbarStore();
const { currencyFilter: cf } = useCurrencyFilter();
const DEFAULT_AMOUNT = Math.round(cf.value(100));
const infoStore = useInfoStore();

const form = ref<VForm>();

const currentCategoryId = ref<Category['id']>('');
const formState = ref<Pick<Record, 'amount' | 'description' | 'type'>>({
	amount: DEFAULT_AMOUNT,
	description: '',
	type: 'outcome'
});

const info = computed(() => infoStore.info);

const canCreateRecord = computed(() => {
	return formState.value.type === 'income' ? true : cf.value(info.value!.bill) >= formState.value.amount;
});

const { state: categories, isLoading } = useAsyncState(fetchCategories, [], {
	onError: (e) => {
		showMessage(messages[e as keyof typeof messages] || t('error_load_categories'))
	},
	onSuccess: (cats) => {
		currentCategoryId.value = cats?.[0].id || '';
	}
});

const submitHandler = async () => {
	if (canCreateRecord.value) {
		const valid = (await form.value?.validate())?.valid;
		if (valid) {
			try {
				const { amount, ...data } = formState.value;
				await createRecord({
					...data,
					amount: cf.value(amount, undefined, 'reverse'),
					categoryId: currentCategoryId.value,
				} as Record);

				const { type } = data;
				const newBill = type === 'income' ?
					info.value!.bill + cf.value(amount, undefined, 'reverse') : info.value!.bill - cf.value(amount, undefined, 'reverse');

				await updateInfo({ bill: +newBill.toFixed(2) });
				showMessage(t('createRecord_success'));

				form.value?.reset();
				formState.value.amount = DEFAULT_AMOUNT;
			} catch (e) {
				showMessage(messages[e as keyof typeof messages] || e as string);
			}
		}
	}
	else {
		showMessage(t('lack_of_amount') +
			` (${n(formState.value.amount - cf.value(info.value!.bill), 'currency', info.value?.currency || import.meta.env.VITE_APP_DEFAULT_CURRENCY || 'USD')})`);
	}
}
</script>

<style lang="scss" scoped></style>