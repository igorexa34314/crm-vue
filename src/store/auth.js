import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

export const authModule = {
	namespaced: true,
	actions: {
		async login({ commit }, { email, password }) {
			try {
				await signInWithEmailAndPassword(getAuth(), email, password);
			} catch (e) {
				commit('setError', e, { root: true });
				throw e;
			}
		},
		async register({ commit, dispatch }, { email, password, name }) {
			try {
				await createUserWithEmailAndPassword(getAuth(), email, password);
				const uid = await dispatch('getUserId');
				await set(ref(getDatabase(), `users/${uid}/info`), {
					bill: 10000,
					name
				});
			} catch (e) {
				commit('setError', e, { root: true });
				throw e;
			}
		},
		getUserId() {
			console.log(getAuth(), 'getuid');
			if (getAuth().currentUser.uid) {
				return getAuth().currentUser.uid;
			}
			return;
		},
		async logout({ commit }) {
			await signOut(getAuth());
			commit('info/clearInfo', {}, { root: true });
		}
	}
};
