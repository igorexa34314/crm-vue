import { errorHandler } from '@/utils/errorHandler';
import { db, storage } from '@/firebase';
import {
	doc,
	collection as col,
	onSnapshot,
	setDoc,
	updateDoc,
	getDoc,
	Timestamp
} from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useInfoStore, UserInfo } from '@/stores/info';
import { AuthService } from '@/services/auth';
import { CurrencyRates } from '@/services/currency';
import { TimestampToDate } from './record';
import { Locales } from '@/plugins/i18n';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_BILL = import.meta.env.VITE_APP_DEFAULT_BILL || 1000;
const DEFAULT_CURRENCY = import.meta.env.VITE_APP_DEFAULT_CURRENCY || ('USD' as CurrencyRates);
const DEFAULT_LOCALE = import.meta.env.VITE_APP_DEFAULT_LOCALE || ('uk-UA' as Locales);

export interface UserCredentials {
	uid: string;
	email: string;
	displayName?: string;
}

export class UserService {
	static async createUser({ uid, displayName, ...user }: UserCredentials & Partial<UserInfo>) {
		return setDoc(
			doc(col(db, 'users'), uid),
			{
				info: {
					...user,
					bill: DEFAULT_BILL,
					firstName: displayName?.split(' ').at(0) || '',
					lastName: displayName?.split(' ').at(1) || '',
					gender: 'unknown',
					locale: DEFAULT_LOCALE,
					currency: DEFAULT_CURRENCY
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
						const info = snapshot.data().info;
						if (info.birthdayDate) {
							info.birthdayDate = TimestampToDate(info.birthdayDate);
						}
						setInfo(info);
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

	static async updateUserAvatar(files: File[]) {
		try {
			if (files.length !== 1) {
				throw new Error('You should profide only 1 file');
			}
			const avatar = files[0];
			if (avatar instanceof File) {
				const uid = await AuthService.getUserId();
				const avatarRef = storageRef(
					storage,
					`userdata/${uid}/avatar/${uuidv4()}.${avatar.name.split('.').at(-1)}`
				);
				await uploadBytes(avatarRef, avatar, {
					contentType: avatar.type
				});
				const avatarURL = await getDownloadURL(avatarRef);
				await updateDoc(doc(col(db, 'users'), uid), {
					'info.photoURL': avatarURL
				});
			}
		} catch (e) {
			errorHandler(e);
		}
	}
}
