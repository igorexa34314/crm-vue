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
import { createUser, getUserById, updateInfo, updateUser } from './user';

export interface UserCredentials {
	email: string;
	password: string;
	username?: string;
}

export const login = async ({ email, password }: UserCredentials) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (e) {
		errorHandler(e);
	}
};

export const register = async ({ email, password, username }: UserCredentials) => {
	try {
		const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
		await createUser({ uid: user.uid, email, username: username || '' });
	} catch (e) {
		errorHandler(e);
	}
};

export const getUserId = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser && currentUser.uid) {
		return currentUser.uid;
	}
};

export const signInWithGooglePopup = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const { uid, email, displayName } = (await signInWithPopup(auth, provider)).user;

		const isUserExists = (await getUserById(uid)).exists();
		if (!isUserExists) {
			await createUser({
				uid: uid,
				email: email || '',
				displayName: displayName || '',
				username: email?.split('@')[0] || `user-${uid}`
			});
		}
	} catch (e) {
		errorHandler(e);
	}
};

export const logout = async () => {
	const { $reset } = useInfoStore();
	await signOut(auth);
	$reset();
};
