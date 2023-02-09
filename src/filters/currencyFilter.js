export const useCurrencyFilter = (value, currency = 'UAH') => {
	return new Intl.NumberFormat('ua', {
		style: 'currency',
		currency
	}).format(value);
};