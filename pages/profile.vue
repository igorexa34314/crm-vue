<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">{{ t('pageTitles.profile') }}</h3>
		</div>
		<v-form ref="form" @submit.prevent="submitHandler" class="profile-form mt-8 px-4">
			<LocalizedInput v-model="formState.name" :rules="user.name" variant="underlined" :label="t('name')" required />
			<v-select v-model="formState.locale" :items="locales" :label="t('lang')" item-title="title" item-value="value"
				variant="underlined" class="mt-4" />
			<v-select v-model="formState.currency" :items="currencies" :label="t('currency')" item-title="title"
				item-value="value" variant="underlined" class="mt-4" />

			<v-btn type="submit" color="teal-darken-2" class="mt-5">
				{{ t('update') }}
				<v-icon :icon="mdiSend" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import LocalizedInput from '@/components/UI/LocalizedInput.vue';
import { mdiSend } from '@mdi/js';
import { updateInfo } from '@/api/user';
import { user } from '@/utils/validations';
import { VForm } from 'vuetify/components';
import { Locales } from '@/stores/info';
import { CurrencyRates } from '@/api/currency';
import { currencyKey } from '@/injection-keys';

definePageMeta({ middleware: ['auth'] });
useHead({ title: 'pageTitles.profile' });

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { showMessage } = useSnackbarStore();
const infoStore = useInfoStore();

const { currency } = inject(currencyKey)!;

const currencies = computed(() => {
	const currencyNames = (currency.value?.rates ? Object.keys(currency.value.rates) : [import.meta.env.VITE_APP_DEFAULT_CURRENCY || 'USD']) as CurrencyRates[];
	return currencyNames.map(c => ({ title: t(`currencies.${c}`) + ` (${c})`, value: c }));
});

const info = computed(() => infoStore.info);

const form = ref<VForm>();

const formState = ref({
	name: '',
	locale: '' as Locales,
	currency: '' as CurrencyRates
});

const locales = [
	{ title: 'Русский', value: 'ru-RU' },
	{ title: 'Українська', value: 'uk-UA' },
	{ title: 'English', value: 'en-US' },
];

//fillInfo
watchEffect(() => {
	if (info.value && Object.keys(info.value).length) {
		const { bill, ...userdata } = info.value;
		formState.value = userdata;
	}
})

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
	if (valid) {
		try {
			await updateInfo(formState.value);
			showMessage(t('updateProfile_message'));
		} catch (e) {
			showMessage(t(e as string) || e as string);
		}
	}
}
</script>

<style lang="scss" scoped></style>