import { getDatabase, ref as dbRef, push, set, get, child, update } from 'firebase/database';
import { getUserId } from '@/api/auth';
import { errorHandler } from '@/utils/errorHandler';

export interface Category {
	readonly id?: string;
	title: string;
	limit: number;
}

export const fetchCategories = async () => {
	try {
		const uid = await getUserId();
		const categories = (await get(dbRef(getDatabase(), `users/${uid}/categories`))).val() || {};
		return Object.keys(categories).map(key => ({ ...categories[key], id: key })) as Category[];
	} catch (e) {
		errorHandler(e);
	}
};
export const createCategory = async ({ title, limit }: Category) => {
	try {
		const uid = await getUserId();
		const newCategoryRef = await push(dbRef(getDatabase(), `users/${uid}/categories`));
		await set(newCategoryRef, { title, limit });
		return { title, limit, id: newCategoryRef.key as string };
	} catch (e) {
		errorHandler(e);
	}
};
export const updateCategory = async (categoryId: string, { title, limit }: Partial<Category>) => {
	try {
		const uid = await getUserId();
		const categoryRef = await child(dbRef(getDatabase(), `users/${uid}/categories`), categoryId);
		await update(categoryRef, { title, limit });
	} catch (e) {
		errorHandler(e);
	}
};
export const fetchCategoryById = async (id: Category['id']) => {
	try {
		const uid = await getUserId();
		const categoryRef = await child(dbRef(getDatabase(), `users/${uid}/categories`), id!);
		const category = (await get(categoryRef)).val() || {};
		return { ...category, id } as Category;
	} catch (e) {
		errorHandler(e);
	}
};
