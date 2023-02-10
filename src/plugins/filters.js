import { useCurrencyFilter } from '@/filters/currencyFilter';
import { useDateFilter } from '@/filters/dateFilter';
import { useLocalizeFilter } from '@/filters/localizeFilter';

const filters = {
	install: app => {
		app.config.globalProperties.$filters = {
			currency: useCurrencyFilter,
			date: useDateFilter,
			localize: useLocalizeFilter
		};
	}
};
export default filters;
