import { getDatabase, ref, push, set, get, child } from 'firebase/database';

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
		},
		async fetchRecords({ commit, dispatch }) {
			try {
				const uid = await dispatch('auth/getUserId', {}, { root: true });
				const records = (await get(ref(getDatabase(), `users/${uid}/records`))).val() || {};
				return Object.keys(records).map(key => ({ ...records[key], id: key }));
			} catch (e) {
				commit('setError', e, { root: true });
				throw e;
			}
		},
		async fetchRecordById({ commit, dispatch }, id) {
			try {
				const uid = await dispatch('auth/getUserId', {}, { root: true });
				const recordRef = await child(ref(getDatabase(), `users/${uid}/records`), id);
				const record = (await get(recordRef)).val() || {};
				return { ...record, id };
			} catch (e) {
				commit('setError', e, { root: true });
				throw e;
			}
		}
	}
};
