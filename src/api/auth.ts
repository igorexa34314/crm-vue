import { useInfoStore } from '@/stores/info';
import { errorHandler } from '@/utils/errorHandler';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getCurrentUser } from 'vuefire';

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
			bill: 10000,
			name,
			locale: 'ru-RU'
		});
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
