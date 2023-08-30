import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { CurrencyRates } from '@/services/currency';
import { Locales } from '@/plugins/i18n';
import { useSnackbarStore } from '@/stores/snackbar';
import { DEFAULT_LOCALE, DEFAULT_CURRENCY, LOCALE_KEY } from '@/globals';

export interface UserInfo {
	email: string;
	bill: number;
	locale: Locales;
	username: string;
	firstName?: string;
	photoURL?: string;
	lastName?: string;
	birthdayDate?: Date;
	gender: 'male' | 'female' | 'unknown';
	bio?: string;
	currency: CurrencyRates;
}

export const useInfoStore = defineStore('info', () => {
	const info = ref<UserInfo | null>(null);

	const isLocaleLoading = ref(false);

	const setInfo = (data: UserInfo) => {
		info.value = data;
	};
	const $reset = () => {
		info.value = null;
	};
	const userCurrency = computed(() => info.value?.currency || DEFAULT_CURRENCY);

	const setLocale = () => {
		(info.value as Partial<UserInfo>) = {
			...info.value,
			locale: JSON.parse(localStorage.getItem(LOCALE_KEY) || 'null') || DEFAULT_LOCALE,
		};
	};

	const $subscribeLocale = (cb: (locale: Locales) => Promise<void> | void) => {
		return watch(
			() => info.value?.locale,
			async newVal => {
				if (newVal) {
					try {
						isLocaleLoading.value = true;
						await cb(newVal);
					} catch (err) {
						const { showMessage } = useSnackbarStore();
						showMessage('error_loading_locale', 'red-darken-3');
					} finally {
						isLocaleLoading.value = false;
					}
				}
			},
			{ deep: true }
		);
	};

	return {
		info,
		userCurrency,
		setInfo,
		$reset,
		$subscribeLocale,
		setLocale,
	};
});
