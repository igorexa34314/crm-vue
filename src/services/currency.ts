import { errorHandler } from '@/utils/errorHandler';
import { DEFAULT_CURRENCY, availableCurrencies } from '@/globals';

export type CurrencyRates = (typeof availableCurrencies)[number];
export interface Currency {
	rates: Record<CurrencyRates, number>;
	date: Date;
}

export const DEFAULT_CURRENCY_RESPONSE = {
	rates: { [DEFAULT_CURRENCY]: 1 },
	date: new Date(),
} as Currency;

export class CurrencyService {
	static async fetchCurrency() {
		const currenciesToFetch = availableCurrencies.join('%2C');
		try {
			const res = await fetch(
				import.meta.env.VITE_EXCHANGER_API_URL + `?base=${DEFAULT_CURRENCY}&symbols=${currenciesToFetch}`,
				{
					method: 'GET',
					redirect: 'follow',
					headers: new Headers({
						'Content-Type': 'application/json',
					}),
				}
			);
			const { rates, date } = (await res.json()) as Awaited<Currency>;
			return ({ rates, date } || DEFAULT_CURRENCY_RESPONSE) as Currency;
		} catch (e) {
			return errorHandler(e);
		}
	}
}
