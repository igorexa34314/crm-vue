import { defineStore } from 'pinia';
import { useAuth } from '@/composables/auth';
import { useErrorStore } from '@/stores/error';
import { getDatabase, ref as docRef, onValue, update } from 'firebase/database';
import { ref } from 'vue';

export enum Locales {
	ru = 'ru-RU',
	ua = 'uk-UA',
	en = 'en-US'
}

export interface UserInfo {
	bill: number;
	locale: Locales;
	name: string;
}

export const useInfoStore = defineStore('info', () => {
	const { getUserId } = useAuth();
	const { setError } = useErrorStore();

	const info = ref<UserInfo | {}>({});

	const setInfo = (data: UserInfo) => {
		info.value = data;
	};
	const clearInfo = () => {
		info.value = {};
	};
	const setLocale = () => {
		info.value = { ...info.value, locale: JSON.parse(localStorage.getItem('lang') || '') || 'ru-RU' };
	};
	const fetchInfo = async () => {
		try {
			const uid = await getUserId();
			await onValue(docRef(getDatabase(), `users/${uid}/info`), snapshot => {
				const info = snapshot.val();
				setInfo(info);
			});
		} catch (e) {
			setError(e);
			throw e;
		}
	};
	const updateInfo = async (toUpdate: Partial<UserInfo>) => {
		try {
			if (toUpdate.locale) {
				localStorage.setItem('lang', JSON.stringify(toUpdate.locale));
			}
			const uid = await getUserId();
			const updateData = { ...info, ...toUpdate };
			await update(docRef(getDatabase(), `users/${uid}/info`), updateData);
		} catch (e) {
			setError(e);
			throw e;
		}
	};

	return {
		info,
		setInfo,
		clearInfo,
		setLocale,
		fetchInfo,
		updateInfo
	};
});
