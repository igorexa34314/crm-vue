import { useErrorStore } from '@/stores/error';
import { useInfoStore } from '@/stores//info';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { getCurrentUser } from 'vuefire';

export const useAuth = () => {
	const auth = getAuth();
	const { clearInfo } = useInfoStore();
	const { setError } = useErrorStore();
	const login = async ({ email, password }) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (e) {
			setError(e);
			throw e;
		}
	};
	const register = async ({ email, password, name }) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			const uid = await getUserId();
			await set(ref(getDatabase(), `users/${uid}/info`), {
				bill: 10000,
				name,
				locale: 'ru-RU'
			});
		} catch (e) {
			setError(e);
			throw e;
		}
	};
	const getUserId = async () => {
		const currentUser = await getCurrentUser();
		if (currentUser && currentUser.uid) {
			return currentUser.uid;
		}
		return;
	};
	const logout = async () => {
		await signOut(auth);
		clearInfo();
	};

	return {
		login,
		register,
		logout,
		getUserId
	};
};
