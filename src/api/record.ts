import { getDatabase, ref, push, set, get, child, serverTimestamp } from 'firebase/database';
import { getUserId } from '@/api/auth';
import { errorHandler } from '@/utils/errorHandler';
import { Timestamp } from 'firebase/firestore';

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
const TimestampToDate = ({ seconds, nanoseconds }: Timestamp) => new Timestamp(seconds, nanoseconds).toDate();
export const createRecord = async (record: Record) => {
	try {
		const uid = await getUserId();
		const newRecordRef = await push(ref(getDatabase(), `users/${uid}/records`));
		await set(newRecordRef, { ...record, date: Timestamp.now() });
	} catch (e) {
		errorHandler(e);
	}
};
export const fetchRecords = async () => {
	try {
		const uid = await getUserId();
		const records = (await get(ref(getDatabase(), `users/${uid}/records`))).val() || {};
		return Object.keys(records).map((key: NonNullable<Record['id']>) => ({ ...records[key], date: TimestampToDate(records[key].date), id: key } as Record));
	} catch (e) {
		errorHandler(e);
	}
};
export const fetchRecordById = async (id: string) => {
	try {
		const uid = await getUserId();
		const recordRef = await child(ref(getDatabase(), `users/${uid}/records`), id);
		const record = (await get(recordRef)).val() || {};
		return { ...record, date: TimestampToDate(record.date), id } as Record;
	} catch (e) {
		errorHandler(e);
	}
};
