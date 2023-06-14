import { currencyKey } from '@/injection-keys';
import { CurrencyRates } from '@/api/currency';

export const useCurrencyFilter = () => {
	const { currency } = inject(currencyKey)!;

	const infoStore = useInfoStore();

	const currencyFilter = computed(
		() =>
			(amount: number, currencyType?: CurrencyRates, type: 'direct' | 'reverse' = 'direct') => {
				if (!currencyType) {
					currencyType = infoStore.info?.currency || 'USD';
				}
				if (currency.value && Object.keys(currency.value).length) {
					return +(
						type === 'direct'
							? amount * currency.value.rates[currencyType]
							: amount / currency.value.rates[currencyType]
					).toFixed(2);
				}
				return amount;
			}
	);

	return { currencyFilter };
};
