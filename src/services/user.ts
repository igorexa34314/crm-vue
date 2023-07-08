import { errorHandler } from '@/utils/errorHandler';
import { db } from '@/firebase';
import { doc, collection as col, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { useInfoStore, UserInfo } from '@/stores/info';
import { getUserId } from '@/services/auth';
import { CurrencyRates } from '@/services/currency';

const DEFAULT_BILL = import.meta.env.VITE_APP_DEFAULT_BILL;
const DEFAULT_CURRENCY = import.meta.env.VITE_APP_DEFAULT_CURRENCY as CurrencyRates;

export interface UserCredentials {
	uid: string;
	email: string;
	name: string;
}

export const createUser = async ({ uid, ...user }: UserCredentials) => {
	return setDoc(doc(col(db, 'users'), uid), {
		info: {
			bill: DEFAULT_BILL,
			name: user.name,
			locale: 'ru-RU',
			currency: DEFAULT_CURRENCY
		} as UserInfo
	});
};

export const fetchInfo = async () => {
	try {
		const { setInfo } = useInfoStore();
		const uid = await getUserId();
		if (uid) {
			return onSnapshot(doc(col(db, 'users'), uid), snapshot => {
				if (snapshot.exists() && Object.keys(snapshot.data()?.info).length) {
					setInfo(snapshot.data().info);
				}
			});
		}
	} catch (e) {
		errorHandler(e);
	}
};
export const updateInfo = async (toUpdate: Partial<UserInfo>) => {
	try {
		const uid = await getUserId();
		await updateDoc(
			doc(col(db, 'users'), uid),
			Object.assign(
				{},
				...Object.keys(toUpdate).map(key => ({
					[`info.${key}`]: toUpdate[key as keyof UserInfo]
				}))
			)
		);
	} catch (e) {
		errorHandler(e);
	}
};
