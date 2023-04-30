import { useInfoStore } from '@/stores/info';

enum IntlDateFormat {
	TWO_DIGIT = '2-digit',
	LONG = 'long',
	SHORT = 'short',
	NUMERIC = 'numeric',
	NARROW = 'narrow'
}

interface DateOptions {
	hour?: IntlDateFormat.NUMERIC | IntlDateFormat.TWO_DIGIT;
	minute?: IntlDateFormat.NUMERIC | IntlDateFormat.TWO_DIGIT;
	second?: IntlDateFormat.NUMERIC | IntlDateFormat.TWO_DIGIT;
	day?: IntlDateFormat.NUMERIC | IntlDateFormat.TWO_DIGIT;
	month?: IntlDateFormat;
	year?: IntlDateFormat.NUMERIC | IntlDateFormat.TWO_DIGIT;
}

export const useDateFilter = (value: Date, format = 'date') => {
	const infoStore = useInfoStore();
	const options: DateOptions = {
		day: IntlDateFormat.TWO_DIGIT,
		month: IntlDateFormat.LONG,
		year: IntlDateFormat.NUMERIC
	};
	if (format.includes('date')) {
		options.day = IntlDateFormat.TWO_DIGIT;
		options.month = IntlDateFormat.LONG;
		options.year = IntlDateFormat.NUMERIC;
	}
	if (format.includes('time')) {
		options.day = IntlDateFormat.TWO_DIGIT;
		options.month = IntlDateFormat.TWO_DIGIT;
		options.year = IntlDateFormat.TWO_DIGIT;
		options.second = IntlDateFormat.TWO_DIGIT;
		options.minute = IntlDateFormat.TWO_DIGIT;
		options.hour = IntlDateFormat.TWO_DIGIT;
	}
	const locale = infoStore.info?.locale || 'ru-RU';
	return new Intl.DateTimeFormat(locale, options).format(new Date(value));
};
