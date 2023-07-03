import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { CurrencyRates } from '@/api/currency';
import { Locales } from '@/plugins/i18n';

export interface UserInfo {
	bill: number;
	locale: Locales;
	name: string;
	currency: CurrencyRates;
}

export const useInfoStore = defineStore('info', () => {
	const info = ref<UserInfo | null>(null);

	const setInfo = (data: UserInfo) => {
		info.value = data;
	};
	const $reset = () => {
		info.value = null;
	};
	const userCurrency = computed(
		() => info.value?.currency || import.meta.env.VITE_APP_DEFAULT_CURRENCY || 'USD'
	);

	const setLocale = () => {
		(info.value as Partial<UserInfo>) = {
			locale:
				JSON.parse(localStorage.getItem('lang') || '{}') ||
				import.meta.env.VITE_APP_DEFAULT_LOCALE ||
				'en-US'
		};
	};

	const $subscribeLocale = (cb: (locale: Locales) => any) => {
		return watch(
			() => info.value?.locale,
			newVal => {
				if (newVal) {
					cb(newVal);
				}
			},
			{ deep: true, immediate: true }
		);
	};
	return {
		info,
		userCurrency,
		setInfo,
		$reset,
		$subscribeLocale,
		setLocale
	};
});
