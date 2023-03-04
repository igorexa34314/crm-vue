import { getDatabase, ref, push, set, get, child, update } from 'firebase/database';
import { useErrorStore } from '@/stores/error';
import { useAuth } from '@/composables/auth';

export interface Category {
	readonly id?: string | null;
	title: string;
	limit: number;
}

export const useCategory = () => {
	const { setError } = useErrorStore();
	const { getUserId } = useAuth();

	const fetchCategories = async () => {
		try {
			const uid = await getUserId();
			const categories = (await get(ref(getDatabase(), `users/${uid}/categories`))).val() || {};
			return Object.keys(categories).map(key => ({ ...categories[key], id: key }));
		} catch (e) {
			setError(e);
			throw e;
		}
	};
	const createCategory = async ({ title, limit }: Category) => {
		try {
			const uid = await getUserId();
			const newCategoryRef = await push(ref(getDatabase(), `users/${uid}/categories`));
			await set(newCategoryRef, { title, limit });
			return { title, limit, id: newCategoryRef.key };
		} catch (e) {
			setError(e);
			throw e;
		}
	};
	const updateCategory = async (categoryId: string, { title, limit }: Category) => {
		try {
			const uid = await getUserId();
			const categoryRef = await child(ref(getDatabase(), `users/${uid}/categories`), categoryId);
			await update(categoryRef, { title, limit });
		} catch (e) {
			setError(e);
			throw e;
		}
	};
	const fetchCategoryById = async (id: Category['id']) => {
		try {
			const uid = await getUserId();
			const categoryRef = await child(ref(getDatabase(), `users/${uid}/categories`), id!);
			const category = (await get(categoryRef)).val() || {};
			return { ...category, id };
		} catch (e) {
			setError(e);
			throw e;
		}
	};

	return {
		fetchCategories,
		fetchCategoryById,
		createCategory,
		updateCategory
	};
};
