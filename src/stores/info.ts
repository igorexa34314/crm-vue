import { defineStore } from 'pinia';
import { ref } from 'vue';

export enum Locales {
	RU = 'ru-RU',
	UA = 'uk-UA',
	EN = 'en-US'
}

export interface UserInfo {
	bill: number;
	locale: Locales;
	name: string;
}

export const useInfoStore = defineStore('info', () => {
	const info = ref<UserInfo | null>(null);

	const setInfo = (data: UserInfo) => {
		info.value = data;
	};
	const $reset = () => {
		info.value = null;
	};
	const setLocale = () => {
		(info.value as Partial<UserInfo>) = { locale: JSON.parse(localStorage.getItem('lang') || '') || Locales.RU };
	};

	return {
		info,
		setInfo,
		$reset,
		setLocale
	};
});
