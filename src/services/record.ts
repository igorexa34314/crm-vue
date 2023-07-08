import { db } from '@/firebase';
import {
	doc,
	collection as col,
	setDoc,
	getDoc,
	getDocs,
	serverTimestamp,
	addDoc
} from 'firebase/firestore';
import { getUserId } from '@/services/auth';
import { errorHandler } from '@/utils/errorHandler';
import { Timestamp } from 'firebase/firestore';

type RecordType = 'income' | 'outcome';

export interface Record {
	readonly id?: string;
	categoryId: string | undefined;
	description?: string;
	amount: number;
	type: RecordType;
	date: Date;
}
const TimestampToDate = ({ seconds, nanoseconds }: Timestamp) =>
	new Timestamp(seconds, nanoseconds).toDate();
export const createRecord = async (record: Record) => {
	try {
		const uid = await getUserId();
		await addDoc(col(doc(col(db, 'users'), uid), 'records'), {
			...record,
			date: Timestamp.now()
		});
	} catch (e) {
		errorHandler(e);
	}
};
export const fetchRecords = async () => {
	try {
		const records: Record[] = [];
		const uid = await getUserId();
		const recordDocs = await getDocs(col(doc(col(db, 'users'), uid), 'records'));
		if (!recordDocs.empty) {
			recordDocs.forEach(doc => {
				records.push({
					...doc.data(),
					date: TimestampToDate(doc.data().date),
					id: doc.id
				} as Record);
			});
			return records;
		}
	} catch (e) {
		errorHandler(e);
	}
};
export const fetchRecordById = async (id: string) => {
	try {
		const uid = await getUserId();
		const recordRef = doc(col(doc(col(db, 'users'), uid), 'records'), id);
		const recordDoc = await getDoc(recordRef);
		if (!recordDoc.exists()) {
			throw new Error('Record not found');
		}
		return { ...recordDoc.data(), date: TimestampToDate(recordDoc.data().date), id } as Record;
	} catch (e) {
		errorHandler(e);
	}
};
