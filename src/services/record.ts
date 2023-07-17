import { db } from '@/firebase';
import {
	doc,
	collection as col,
	getDoc,
	getDocs,
	addDoc
} from 'firebase/firestore';
import { AuthService } from '@/services/auth';
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

export class RecordService {
	static async createRecord(record: Record) {
		try {
			const uid = await AuthService.getUserId();
			await addDoc(col(doc(col(db, 'users'), uid), 'records'), {
				...record,
				date: Timestamp.now()
			});
		} catch (e) {
			errorHandler(e);
		}
	}

	static async fetchRecords() {
		try {
			const records: Record[] = [];
			const uid = await AuthService.getUserId();
			const recordDocs = await getDocs(col(doc(col(db, 'users'), uid), 'records'));
			if (!recordDocs.empty) {
				recordDocs.forEach(doc => {
					records.push({
						...doc.data(),
						date: this.TimestampToDate(doc.data().date),
						id: doc.id
					} as Record);
				});
				return records;
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	static async fetchRecordById(id: string) {
		try {
			const uid = await AuthService.getUserId();
			const recordRef = doc(col(doc(col(db, 'users'), uid), 'records'), id);
			const recordDoc = await getDoc(recordRef);
			if (!recordDoc.exists()) {
				throw new Error('Record not found');
			}
			return {
				...recordDoc.data(),
				date: this.TimestampToDate(recordDoc.data().date),
				id
			} as Record;
		} catch (e) {
			errorHandler(e);
		}
	}

	private static TimestampToDate({ seconds, nanoseconds }: Timestamp) {
		return new Timestamp(seconds, nanoseconds).toDate();
	}
}
