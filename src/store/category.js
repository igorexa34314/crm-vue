import { getDatabase, ref, push, set, get, child, update } from 'firebase/database';

export const categoryModule = {
	namespaced: true,
	actions: {
		async fetchCategories({ commit, dispatch }) {
			try {
				const uid = await dispatch('auth/getUserId', {}, { root: true });
				const categories = (await get(ref(getDatabase(), `users/${uid}/categories`))).val() || {};
				return Object.keys(categories).map(key => ({ ...categories[key], id: key }));
			} catch (e) {
				commit('setError', e, { root: true });
				throw e;
			}
		},
		async fetchCategoryById({ commit, dispatch }, id) {
			try {
				const uid = await dispatch('auth/getUserId', {}, { root: true });
				const categoryRef = await child(ref(getDatabase(), `users/${uid}/categories`), id);
				const category = (await get(categoryRef)).val() || {};
				return { ...category, id };
			} catch (e) {
				commit('setError', e, { root: true });
				throw e;
			}
		},
		async createCategory({ commit, dispatch }, { title, limit }) {
			try {
				const uid = await dispatch('auth/getUserId', {}, { root: true });
				const newCategoryRef = await push(ref(getDatabase(), `users/${uid}/categories`));
				const category = await set(newCategoryRef, { title, limit });
				return { title, limit, id: newCategoryRef.key };
			} catch (e) {
				commit('setError', e, { root: true });
				throw e;
			}
		},
		async updateCategory({ commit, dispatch }, { title, limit, id }) {
			try {
				const uid = await dispatch('auth/getUserId', {}, { root: true });
				const categoryRef = await child(ref(getDatabase(), `users/${uid}/categories`), id);
				await update(categoryRef, { title, limit });
			} catch (e) {
				commit('setError', e, { root: true });
				throw e;
			}
		}
	}
};
