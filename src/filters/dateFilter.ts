import { useInfoStore } from '@/stores/info';

enum IntlDateFormat {
	TwoDigit = '2-digit',
	Long = 'long',
	Short = 'short',
	Numeric = 'numeric'
}

interface DateOptions {
	day: IntlDateFormat;
	month: IntlDateFormat;
	year: IntlDateFormat;
}

export const useDateFilter = (value: Date, format = 'date') => {
	const info = useInfoStore();
	const options: DateOptions = {
		day: IntlDateFormat.TwoDigit,
		month: IntlDateFormat.Long,
		year:IntlDateFormat.Numeric
	};
	if (format.includes('date')) {
		options.day = IntlDateFormat.TwoDigit;
		options.month = IntlDateFormat.Long;
		options.year = IntlDateFormat.Numeric;
	}
	if (format.includes('time')) {
		options.day = IntlDateFormat.TwoDigit;
		options.month = IntlDateFormat.TwoDigit;
		options.year = IntlDateFormat.TwoDigit;
	}
	const locale = info.info.locale || 'ru-RU';
	return new Intl.DateTimeFormat(locale, options).format(new Date(value));
};
