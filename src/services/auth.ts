import { useInfoStore } from '@/stores/info';
import { errorHandler } from '@/utils/errorHandler';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup as callAuthPopup,
	FacebookAuthProvider,
	GithubAuthProvider,
	fetchSignInMethodsForEmail,
	linkWithCredential
} from 'firebase/auth';
import { auth } from '@/firebase';
import { getCurrentUser } from 'vuefire';
import { UserService } from '@/services/user';
import { FirebaseError } from 'firebase/app';

export interface UserCredentials {
	email: string;
	password: string;
	username?: string;
}

function getProvider(providerId: (typeof supportedPopupSignInMethods)[number]) {
	switch (providerId) {
		case supportedPopupSignInMethods[0]:
			return new GoogleAuthProvider();
		case supportedPopupSignInMethods[1]:
			return new FacebookAuthProvider();
		case supportedPopupSignInMethods[2]:
			return new GithubAuthProvider();
		default:
			throw new Error(`No provider implemented for ${providerId}`);
	}
}

const supportedPopupSignInMethods = [
	GoogleAuthProvider.PROVIDER_ID,
	FacebookAuthProvider.PROVIDER_ID,
	GithubAuthProvider.PROVIDER_ID
] as const;

export class AuthService {
	static async login({ email, password }: UserCredentials) {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (e) {
			errorHandler(e);
		}
	}

	static async register({ email, password, username }: UserCredentials) {
		try {
			const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
			await UserService.createUser({ uid: user.uid, email, username: username || '' });
		} catch (e) {
			errorHandler(e);
		}
	}

	static async getUserId() {
		const currentUser = await getCurrentUser();
		if (currentUser && currentUser.uid) {
			return currentUser.uid;
		}
	}

	private static async signInWithPopup(provider: any) {
		const { user } = await callAuthPopup(auth, provider);
		const { uid, email, displayName } = user;
		const isUserExists = (await UserService.getUserById(uid)).exists();
		if (!isUserExists) {
			await UserService.createUser({
				uid: uid,
				email: email || '',
				displayName: displayName || '',
				username: email?.split('@')[0] || `user-${uid}`
			});
		}
		return user;
	}

	static async signInWithGoogle() {
		try {
			const provider = new GoogleAuthProvider();
			await this.signInWithPopup(provider);
		} catch (e) {
			errorHandler(e);
		}
	}

	static async signInWithFacebook() {
		try {
			const provider = new FacebookAuthProvider();
			provider.addScope('user_birthday');
			provider.addScope('user_gender');

			await this.signInWithPopup(provider);
		} catch (e) {
			errorHandler(e);
		}
	}

	static async signInWithGithub() {
		try {
			const provider = new GithubAuthProvider();
			provider.addScope('user_birthday');
			provider.addScope('user_gender');

			const user = await this.signInWithPopup(provider);
		} catch (err) {
			if (
				err instanceof FirebaseError &&
				(err.customData?.email as string) &&
				err.code === 'auth/account-exists-with-different-credential'
			) {
				const credential = GithubAuthProvider.credentialFromError(err);

				if (!credential) {
					throw new Error(`Your account credentials are invalid`);
				}

				const providers = await fetchSignInMethodsForEmail(
					auth,
					err.customData?.email as string
				);

				const linkedProvider = new GithubAuthProvider();

				linkedProvider.setCustomParameters({ login_hint: err.customData?.email as string });

				const result = await callAuthPopup(auth, linkedProvider);
				linkWithCredential(result.user, credential);
			}

			// Handle errors...
			// toast.error(err.message || err.toString());
		}
	}
	// async oauthLogin(provider: any) {
	// 	try {
	// 		await AuthService.signInWithPopup(provider);
	// 	} catch (err) {
	// 		if (
	// 			err instanceof FirebaseError &&
	// 			err.email &&
	// 			err.credential &&
	// 			err.code === 'auth/account-exists-with-different-credential'
	// 		) {
	// 			const providers = await fetchSignInMethodsForEmail(auth, err.email);
	// 			const firstPopupProviderMethod = providers.find(p =>
	// 				supportedPopupSignInMethods.includes(p)
	// 			);

	// 			// Test: Could this happen with email link then trying social provider?
	// 			if (!firstPopupProviderMethod) {
	// 				throw new Error(`Your account is linked to a provider that isn't supported.`);
	// 			}

	// 			const linkedProvider = getProvider(firstPopupProviderMethod);
	// 			linkedProvider.setCustomParameters({ login_hint: err.email });

	// 			const result = await firebase.auth().signInWithPopup(linkedProvider);
	// 			result.user.linkWithCredential(err.credential);
	// 		}

	// 		// Handle errors...
	// 		// toast.error(err.message || err.toString());
	// 	}
	// }

	static async logout() {
		const { $reset } = useInfoStore();
		await signOut(auth);
		$reset();
	}
}
