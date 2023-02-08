import { getDatabase, ref, push, set } from 'firebase/database';

export const recordModule = {
	namespaced: true,
	actions: {
		async createRecord({ commit, dispatch }, record) {
			try {
				const uid = await dispatch('auth/getUserId', {}, { root: true });
				const newRecordRef = await push(ref(getDatabase(), `users/${uid}/records`));
				await set(newRecordRef, record);
			} catch (e) {
				commit('setError', e, { root: true });
				throw e;
			}
		}
	}
};
