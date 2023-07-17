import { errorHandler } from '@/utils/errorHandler';
import { db } from '@/firebase';
import { doc, collection as col, onSnapshot, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { useInfoStore, UserInfo } from '@/stores/info';
import { AuthService } from '@/services/auth';
import { CurrencyRates } from '@/services/currency';

const DEFAULT_BILL = import.meta.env.VITE_APP_DEFAULT_BILL;
const DEFAULT_CURRENCY = import.meta.env.VITE_APP_DEFAULT_CURRENCY as CurrencyRates;

export interface UserCredentials {
	uid: string;
	email: string;
	username: string;
	displayName?: string;
}

export class UserService {
	static async createUser({ uid, displayName, ...user }: UserCredentials) {
		return setDoc(
			doc(col(db, 'users'), uid),
			{
				info: {
					bill: DEFAULT_BILL,
					firstName: displayName?.split(' ').at(0) || '',
					lastName: displayName?.split(' ').at(1) || '',
					bio: '',
					gender: 'unknown',
					locale: 'ru-RU',
					currency: DEFAULT_CURRENCY,
					...user
				} as UserInfo
			},
			{ merge: true }
		);
	}

	static async getUserById(uid: UserCredentials['uid']) {
		return getDoc(doc(col(db, 'users'), uid));
	}

	static async fetchInfo() {
		try {
			const { setInfo } = useInfoStore();
			const uid = await AuthService.getUserId();
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
	}

	static async updateUser(uid: UserCredentials['uid'], data: Partial<UserInfo>) {
		updateDoc(
			doc(col(db, 'users'), uid),
			Object.assign(
				{},
				...Object.keys(data).map(key => ({
					[`info.${key}`]: data[key as keyof UserInfo]
				}))
			)
		);
	}

	static async updateInfo(toUpdate: Partial<UserInfo>) {
		try {
			const uid = await AuthService.getUserId();
			if (uid) {
				await this.updateUser(uid, toUpdate);
			}
		} catch (e) {
			errorHandler(e);
		}
	}
}
