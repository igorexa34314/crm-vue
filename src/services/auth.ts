import { useInfoStore } from '@/stores/info';
import { errorHandler } from '@/utils/errorHandler';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup as callAuthPopup,
	FacebookAuthProvider,
	GithubAuthProvider
} from 'firebase/auth';
import { auth } from '@/firebase';
import { getCurrentUser } from 'vuefire';
import { createUser, getUserById } from './user';
import { FirebaseError } from 'firebase/app';

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

export const signInWithPopup = async (provider: any) => {
	const { uid, email, displayName } = (await callAuthPopup(auth, provider)).user;

	const isUserExists = (await getUserById(uid)).exists();
	if (!isUserExists) {
		await createUser({
			uid: uid,
			email: email || '',
			displayName: displayName || '',
			username: email?.split('@')[0] || `user-${uid}`
		});
	}
};

export const signInWithGoogle = async () => {
	try {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(provider);
	} catch (e) {
		errorHandler(e);
	}
};

export const signInWithFacebook = async () => {
	try {
		const provider = new FacebookAuthProvider();
		provider.addScope('user_birthday');
		provider.addScope('user_gender');

		await signInWithPopup(provider);
	} catch (e) {
		errorHandler(e);
	}
};

export const signInWithGithub = async () => {
	try {
		const provider = new GithubAuthProvider();
		provider.addScope('user_birthday');
		provider.addScope('user_gender');

		await signInWithPopup(provider);
	} catch (err) {
		if (err instanceof FirebaseError) {
			const credential = GithubAuthProvider.credentialFromError(err);
			errorHandler(err, '', credential);
		}
	}
};

export const logout = async () => {
	const { $reset } = useInfoStore();
	await signOut(auth);
	$reset();
};
