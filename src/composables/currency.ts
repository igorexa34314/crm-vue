import { useErrorStore } from '@/stores/error';

export interface CurrencyRates<T = number> {
	EUR: T;
	UAH: T;
	USD: T;
}

export const fetchCurrency = async () => {
	const { setError } = useErrorStore();
	try {
		const res = await fetch('https://api.apilayer.com/exchangerates_data/latest?base=USD&symbols=EUR%2C%20UAH%2C%20USD', {
			method: 'GET',
			redirect: 'follow',
			headers: new Headers({
				'apikey': import.meta.env.VITE_APILAYER_API_KEY
			})
		});
		return await res.json();
	} catch (e) {
		setError(e);
		throw e;
	}
};
