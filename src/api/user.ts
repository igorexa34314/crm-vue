import { errorHandler } from '@/utils/errorHandler';
import { db } from '@/firebase';
import { doc, collection as col, onSnapshot, updateDoc } from 'firebase/firestore';
import { useInfoStore, UserInfo } from '@/stores/info';
import { getUserId } from '@/api/auth';

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
