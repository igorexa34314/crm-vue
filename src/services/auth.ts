import { errorHandler } from '@/utils/errorHandler';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithRedirect,
	getRedirectResult,
	FacebookAuthProvider,
	GithubAuthProvider,
	fetchSignInMethodsForEmail,
	linkWithCredential,
	EmailAuthProvider,
	onAuthStateChanged,
	User,
	ErrorFn,
	reauthenticateWithCredential,
	updateEmail,
	updatePassword,
	updateProfile,
	sendEmailVerification,
} from 'firebase/auth';
import { auth } from '@/firebase';
import { UserService } from '@/services/user';
import { FirebaseError } from 'firebase/app';

export interface UserCredentials {
	email: string;
	password: string;
	username?: string;
}

let currentUser: User | null = null;

export class AuthService {
	static getCurrentUser() {
		return new Promise((resolve: (user: User | null) => void, reject: ErrorFn) => {
			if (currentUser) {
				resolve(currentUser);
			} else {
				const unsubscribe = onAuthStateChanged(
					auth,
					user => {
						unsubscribe();
						currentUser = user;
						resolve(user);
					},
					reject
				);
			}
		});
	}

	static async getUserId() {
		const user = await AuthService.getCurrentUser();
		if (!user) {
			throw new Error('User unauthenticated');
		}
		return user.uid;
	}

	static async handleRedirectResult() {
		const result = await getRedirectResult(auth);
		if (result?.user) {
			currentUser = result.user;
		}
	}

	static async login({ email, password }: UserCredentials) {
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			return user;
		} catch (e) {
			errorHandler(e);
		}
	}

	static async register({ email, password, username }: UserCredentials) {
		try {
			const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
			if (user) {
				await updateProfile(user, { displayName: username });
				await sendEmailVerification(user);
				await UserService.createUser({ uid: user.uid, email, username: username || '' });
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	static async changeUserEmail(newEmail: string) {
		try {
			const user = auth.currentUser;
			if (user) {
				await sendEmailVerification(user);
				await updateEmail(user, newEmail);
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	static async changeUserPassword(oldPass: string, newPass: string) {
		try {
			const user = auth.currentUser;
			if (!user) {
				throw new Error('User unauthenticated');
			}
			const credential = EmailAuthProvider.credential(user.email || '', oldPass);
			const userCreds = await reauthenticateWithCredential(user, credential);
			if (userCreds.user) {
				await updatePassword(userCreds.user, newPass);
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	static async updateUserProfile(userdata: { displayName?: string; photoURL?: string }) {
		try {
			const user = auth.currentUser;
			if (user) {
				updateProfile(user, userdata);
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	static async isEmailVerified() {
		const user = auth.currentUser;
		if (!user || !user.uid) {
			throw new Error('User unauthenticated');
		}
		return user.emailVerified;
	}

	private static async signInWithProvider(provider: any) {
		await signInWithRedirect(auth, provider);
		// After the page redirects back
		const creds = await getRedirectResult(auth);
		if (!creds) {
			throw new Error('User unauthenticated');
		}
		const { uid, email, displayName, photoURL } = creds.user;
		const isUserExists = (await UserService.getUserById(uid)).exists();
		if (!isUserExists) {
			await sendEmailVerification(creds.user);
			await UserService.createUser({
				uid: uid,
				email: email || '',
				photoURL: photoURL || '',
				displayName: displayName || '',
				username: email?.split('@').at(0) || `user-${uid}`,
			});
		}
		return creds.user;
	}

	static async signInWithGoogle() {
		try {
			const provider = new GoogleAuthProvider();
			await this.signInWithProvider(provider);
		} catch (err) {
			this.handleAccountExistsError(err);
			errorHandler(err);
		}
	}

	static async signInWithFacebook() {
		try {
			const provider = new FacebookAuthProvider();
			provider.addScope('user_birthday');
			provider.addScope('user_gender');

			await this.signInWithProvider(provider);
		} catch (err) {
			this.handleAccountExistsError(err);
			errorHandler(err);
		}
	}

	private static async handleAccountExistsError(err: unknown) {
		if (err instanceof FirebaseError && err.code === 'auth/account-exists-with-different-credential') {
			const email = err.customData?.email;
			if (email && typeof email === 'string') {
				const credential = GithubAuthProvider.credentialFromError(err);

				if (!credential) {
					throw new Error(`Your account credentials are invalid`);
				}

				const providers = await fetchSignInMethodsForEmail(auth, email);

				let user: User | undefined;

				const firstPopupProviderMethod = providers.find(p =>
					Object.values(supportedPopupSignInMethods).includes(
						p as (typeof supportedPopupSignInMethods)[keyof typeof supportedPopupSignInMethods]
					)
				) as (typeof supportedPopupSignInMethods)[keyof typeof supportedPopupSignInMethods];

				if (firstPopupProviderMethod === supportedPopupSignInMethods.email) {
					const password = prompt('Please provide the password for ' + email);
					user = await this.login({
						email: email,
						password: password || '',
					});
				} else {
					const provider = getProvider(firstPopupProviderMethod);
					// Sign in user to Google with same account.
					provider.setCustomParameters({
						login_hint: email,
					});
					user = await this.signInWithProvider(provider);
				}

				if (user) {
					return linkWithCredential(user, credential);
				}
			}
		}
	}

	static async signInWithGithub() {
		try {
			const provider = new GithubAuthProvider();
			provider.addScope('user_birthday');
			provider.addScope('user_gender');

			await this.signInWithProvider(provider);
		} catch (err) {
			this.handleAccountExistsError(err);
			errorHandler(err);
		}
	}

	static async logout() {
		await signOut(auth);
	}
}

const supportedPopupSignInMethods = {
	email: EmailAuthProvider.PROVIDER_ID,
	google: GoogleAuthProvider.PROVIDER_ID,
	fb: FacebookAuthProvider.PROVIDER_ID,
	gh: GithubAuthProvider.PROVIDER_ID,
} as const;

function getProvider(providerId: (typeof supportedPopupSignInMethods)[keyof typeof supportedPopupSignInMethods]) {
	switch (providerId) {
		case supportedPopupSignInMethods.google:
			return new GoogleAuthProvider();
		case supportedPopupSignInMethods.fb:
			return new FacebookAuthProvider();
		case supportedPopupSignInMethods.gh:
			return new GithubAuthProvider();
		default:
			throw new Error(`No provider implemented for ${providerId}`);
	}
}
