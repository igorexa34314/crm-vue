import { useInfoStore } from '@/stores/info';
import { errorHandler } from '@/utils/errorHandler';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup
} from 'firebase/auth';
import { auth } from '@/firebase';
import { getCurrentUser } from 'vuefire';
import { createUser } from './user';

export interface UserCredentials {
	email: string;
	password: string;
	name?: string;
}

export const login = async ({ email, password }: UserCredentials) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (e) {
		errorHandler(e);
	}
};
export const register = async ({ email, password, name }: UserCredentials) => {
	try {
		const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
		await createUser({ uid: user.uid, email, displayName: name || '' });
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
export const signInWithGooglePopup = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const user = (await signInWithPopup(auth, provider)).user;
		await createUser({
			uid: user.uid,
			email: user.email || '',
			displayName: user.displayName || ''
		});
	} catch (e) {
		errorHandler(e);
	}
};
export const logout = async () => {
	const { $reset } = useInfoStore();
	await signOut(auth);
	$reset();
};
