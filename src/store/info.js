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
			state.info = {
				locale: JSON.parse(localStorage.getItem('lang')) || 'ru-RU'
			};
		},
		setLocale(state) {
			state.info.locale = JSON.parse(localStorage.getItem('lang')) || 'ru-RU';
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
		async updateInfo({ state, commit, dispatch }, toUpdate) {
			try {
				if (toUpdate.locale) {
					localStorage.setItem('lang', JSON.stringify(toUpdate.locale));
				}
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
