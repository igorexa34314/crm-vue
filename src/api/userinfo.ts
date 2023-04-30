import { errorHandler } from '@/utils/errorHandler';
import { getDatabase, ref as docRef, onValue, update } from 'firebase/database';
import { useInfoStore, UserInfo } from '@/stores/info';
import { getUserId } from '@/api/auth';

export const fetchInfo = async () => {
	try {
		const { setInfo } = useInfoStore();
		const uid = await getUserId();
		await onValue(docRef(getDatabase(), `users/${uid}/info`), snapshot => {
			setInfo(snapshot.val());
		});
	} catch (e) {
		errorHandler(e);
	}
};
export const updateInfo = async (toUpdate: Partial<UserInfo>) => {
	try {
		if (toUpdate.locale) {
			localStorage.setItem('lang', JSON.stringify(toUpdate.locale));
		}
		const uid = await getUserId();
		await update(docRef(getDatabase(), `users/${uid}/info`), toUpdate);
	} catch (e) {
		errorHandler(e);
	}
};
