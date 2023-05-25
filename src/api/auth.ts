import { UserInfo, useInfoStore } from '@/stores/info';
import { errorHandler } from '@/utils/errorHandler';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getCurrentUser } from 'vuefire';
import { CurrencyRates } from '@/api/currency';

const DEFAULT_BILL = import.meta.env.VITE_APP_DEFAULT_BILL;
const DEFAULT_CURRENCY = import.meta.env.VITE_APP_DEFAULT_CURRENCY as CurrencyRates;

export interface UserCredentials {
	email: string;
	password: string;
	name?: string;
}

export const login = async ({ email, password }: UserCredentials) => {
	try {
		const auth = getAuth();
		await signInWithEmailAndPassword(auth, email, password);
	} catch (e) {
		errorHandler(e);
	}
};
export const register = async ({ email, password, name }: UserCredentials) => {
	try {
		const auth = getAuth();
		await createUserWithEmailAndPassword(auth, email, password);
		const uid = await getUserId();
		await set(dbRef(getDatabase(), `users/${uid}/info`), {
			bill: DEFAULT_BILL,
			name,
			locale: 'ru-RU',
			currency: DEFAULT_CURRENCY
		} as UserInfo);
	} catch (e) {
		errorHandler(e);
	}
};
export const getUserId = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser && currentUser.uid) {
		return currentUser.uid;
	}
	return;
};
export const logout = async () => {
	const auth = getAuth();
	const { $reset } = useInfoStore();
	await signOut(auth);
	$reset();
};
