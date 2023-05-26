import { FirebaseError } from 'firebase/app';

export const errorHandler = (e: unknown, msg?: string) => {
	console.error(msg || '', e);
	throw e instanceof FirebaseError ? e.code : e;
};
