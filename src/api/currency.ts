import { errorHandler } from '@/utils/errorHandler';

export type CurrencyRates = 'USD' | 'EUR' | 'UAH' | 'RUB';
export interface Currency {
	rates: Record<CurrencyRates, number>;
	date: Date;
}

const DEFAULT_CURRENCY_RESPONSE = {
	rates: { [import.meta.env.VITE_APP_DEFAULT_CURRENCY || 'USD']: 1 },
	date: new Date()
};

export const fetchCurrency = async () => {
	try {
		const res = await fetch(
			import.meta.env.VITE_EXCHANGER_API_URL +
				`?base=${
					import.meta.env.VITE_APP_DEFAULT_CURRENCY || 'USD'
				}&symbols=EUR%2CUAH%2CUSD%2CRUB`,
			{
				method: 'GET',
				redirect: 'follow',
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}
		);
		const { rates, date } = (await res.json()) as Awaited<Currency>;
		return ({ rates, date } || DEFAULT_CURRENCY_RESPONSE) as Currency;
	} catch (e) {
		errorHandler(e);
	}
};
