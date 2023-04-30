import { errorHandler } from '@/utils/errorHandler';

export interface Currency {
	rates: CurrencyRates;
	date: Date;
}

interface CurrencyRates {
	EUR: number;
	UAH: number;
	USD: number;
}

export const fetchCurrency = async () => {
	try {
		const res = await fetch('https://api.apilayer.com/exchangerates_data/latest?base=USD&symbols=EUR%2C%20UAH%2C%20USD', {
			method: 'GET',
			redirect: 'follow',
			headers: new Headers({
				'apikey': import.meta.env.VITE_APILAYER_API_KEY
			})
		});
		return (await res.json()) as Currency;
	} catch (e) {
		errorHandler(e);
	}
};
