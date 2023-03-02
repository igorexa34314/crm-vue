export const useCurrencyFilter = (value: number, currency = 'UAH') => {
	return new Intl.NumberFormat('ua', {
		style: 'currency',
		currency
	}).format(value);
};
