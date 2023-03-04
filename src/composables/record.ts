import { getDatabase, ref, push, set, get, child } from 'firebase/database';
import { useAuth } from '@/composables/auth';
import { useErrorStore } from '@/stores/error';

export enum RecordType {
	income = 'income',
	outcome = 'outcome'
}

export interface Record {
	readonly id?: string;
	categoryId: string | undefined;
	description?: string;
	amount: number;
	type: RecordType;
	date: Date;
}

export const useRecord = () => {
	const { getUserId } = useAuth();
	const { setError } = useErrorStore();
	const createRecord = async (record: Record) => {
		try {
			const uid = await getUserId();
			const newRecordRef = await push(ref(getDatabase(), `users/${uid}/records`));
			await set(newRecordRef, record);
		} catch (e) {
			setError(e);
			throw e;
		}
	};
	const fetchRecords = async (): Promise<Record[]> => {
		try {
			const uid = await getUserId();
			const records = (await get(ref(getDatabase(), `users/${uid}/records`))).val() || {};
			return Object.keys(records).map(key => ({ ...records[key], id: key }));
		} catch (e) {
			setError(e);
			throw e;
		}
	};
	const fetchRecordById = async (id: string): Promise<Record> => {
		try {
			const uid = await getUserId();
			const recordRef = await child(ref(getDatabase(), `users/${uid}/records`), id);
			const record = (await get(recordRef)).val() || {};
			return { ...record, id };
		} catch (e) {
			setError(e);
			throw e;
		}
	};
	return {
		createRecord,
		fetchRecords,
		fetchRecordById
	};
};
