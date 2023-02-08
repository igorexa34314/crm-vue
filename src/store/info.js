import { getDatabase, ref, onValue, update } from 'firebase/database';

export const infoModule = {
	namespaced: true,
	state: () => ({
		info: {}
	}),
	mutations: {
		setInfo(state, info) {
			state.info = info;
		},
		clearInfo(state) {
			state.info = {};
		}
	},
	actions: {
		async fetchInfo({ commit, dispatch }) {
			try {
				const uid = await dispatch('auth/getUserId', {}, { root: true });
				await onValue(ref(getDatabase(), `users/${uid}/info`), snapshot => {
					const info = snapshot.val();
					commit('setInfo', info);
				});
			} catch (e) {
				commit('setError', e, { root: true });
				throw e;
			}
		},
		async updateInfo({ commit, dispatch, state }, toUpdate) {
			try {
				const uid = await dispatch('auth/getUserId', {}, { root: true });
				const updateData = { ...state.info, ...toUpdate };
				await update(ref(getDatabase(), `users/${uid}/info`), updateData);
			} catch (e) {
				commit('setError', e, { root: true });
				throw e;
			}
		}
	}
};
