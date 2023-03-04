import { defineStore } from 'pinia';
import { useAuth } from '@/composables/auth';
import { useErrorStore } from '@/stores/error';
import { getDatabase, ref as docRef, onValue, update } from 'firebase/database';
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
	const { getUserId } = useAuth();
	const { setError } = useErrorStore();

	const info = ref<UserInfo | null>(null);

	const setInfo = (data: UserInfo): void => {
		info.value = data;
	};
	const clearInfo = (): void => {
		info.value = null;
	};
	const setLocale = (): void => {
		info.value!.locale = JSON.parse(localStorage.getItem('lang') || '') || Locales.RU;
	};
	const fetchInfo = async (): Promise<void> => {
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
	const updateInfo = async (toUpdate: Partial<UserInfo>): Promise<void> => {
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
