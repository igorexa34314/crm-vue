import { createI18n, I18nOptions } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
import datetimeFormats from '@/utils/datetimeFormats.json';
import numberFormats from '@/utils/numberFormats.json';

export default createI18n({
	legacy: false, // Vuetify does not support the legacy mode of vue-i18n
	locale: 'en-US',
	fallbackLocale: 'en-US',
	messages,
	datetimeFormats: datetimeFormats as I18nOptions['datetimeFormats'],
	numberFormats: numberFormats as I18nOptions['numberFormats']
});
