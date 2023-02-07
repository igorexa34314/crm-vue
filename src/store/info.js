import { getDatabase, ref, onValue } from 'firebase/database';

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
				debugger;
				const uid = await dispatch('auth/getUserId', {}, { root: true });
				await onValue(
					ref(getDatabase(), `users/${uid}/info`),
					snapshot => {
						const info = snapshot.val();
						commit('setInfo', info);
						console.log('Info', info);
					},
					{ onlyOnce: true }
				);
			} catch (e) {
				console.error(e);
			}
		}
	}
};
