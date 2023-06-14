import datetimeFormats from '@/utils/datetimeFormats.json';
import numberFormats from '@/utils/numberFormats.json';
import { I18nOptions } from '@nuxtjs/i18n';

import enMessages from '@/locales/en-US.json';
import ruMessages from '@/locales/ru-RU.json';
import uaMessages from '@/locales/uk-UA.json';

export default defineI18nConfig(() => ({
	legacy: false, // Vuetify does not support the legacy mode of vue-i18n
	locale: 'en-US',
	fallbackLocale: 'en-US',
	messages: {
		'en-US': enMessages,
		'ru-RU': ruMessages,
		'uk-UA': uaMessages
	},
	datetimeFormats: datetimeFormats as I18nOptions['datetimeFormats'],
	numberFormats: numberFormats as I18nOptions['numberFormats']
}));
