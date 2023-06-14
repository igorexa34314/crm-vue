import { CurrencyRates } from '@/api/currency';

export enum Locales {
	RU = 'ru-RU',
	UA = 'uk-UA',
	EN = 'en-US'
}

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
			locale: (localStorage.getItem('lang') as Locales) || Locales.RU
		};
	};

	return {
		info,
		userCurrency,
		setInfo,
		$reset,
		setLocale
	};
});
