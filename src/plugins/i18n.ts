import { createI18n, I18nOptions } from 'vue-i18n';
import { nextTick } from 'vue';
import messages from '@intlify/unplugin-vue-i18n/messages';
import datetimeFormats from '@/utils/datetimeFormats.json';
import numberFormats from '@/utils/numberFormats.json';
import { fetchLocale } from '@/services/locale';

const availableLocales = ['ru-RU', 'uk-UA', 'en-US'] as const;
export type Locales = (typeof availableLocales)[number];

const i18n = createI18n({
	legacy: false, // Vuetify does not support the legacy mode of vue-i18n
	locale: import.meta.env.VITE_APP_DEFAULT_LOCALE || 'en-US',
	fallbackLocale: import.meta.env.VITE_APP_DEFAULT_LOCALE || 'en-US',
	messages,
	numberFormats: numberFormats as I18nOptions['numberFormats'],
	datetimeFormats: Object.assign(
		{},
		...availableLocales.map(locale => ({
			[locale]: datetimeFormats
		}))
	)
});

export const setI18nLanguage = async (
	locale: Locales = import.meta.env.VITE_APP_DEFAULT_LOCALE || 'en-US'
) => {
	// Load locale if not available yet.
	if (!i18n.global.availableLocales.includes(locale)) {
		const messages = await fetchLocale(locale);

		if (!messages) {
			return;
		}
		// Add locale.
		i18n.global.setLocaleMessage(locale, messages);
		await nextTick();
	}
	localStorage.setItem('lang', JSON.stringify(locale));
	i18n.global.locale.value = locale;
	/**
	 * NOTE:
	 * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
	 * The following is an example for axios.
	 *
	 * axios.defaults.headers.common['Accept-Language'] = locale
	 */
	document.querySelector('html')?.setAttribute('lang', locale);
};

export default i18n;
