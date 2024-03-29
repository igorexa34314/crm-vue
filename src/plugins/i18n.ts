import { createI18n, I18n, I18nOptions } from 'vue-i18n';
import { nextTick, WritableComputedRef } from 'vue';
import fallbackMessages from '@intlify/unplugin-vue-i18n/messages';
import datetimeFormats from '@/utils/datetimeFormats.json';
import numberFormats from '@/utils/numberFormats.json';
import { LocaleService } from '@/services/locale';
import { availableLocales, LOCALE_KEY, DEFAULT_LOCALE } from '@/globals';

export type Locales = (typeof availableLocales)[number];

export const initI18n = async () => {
	const locale: Locales = JSON.parse(localStorage.getItem(LOCALE_KEY) || 'null') || DEFAULT_LOCALE;
	try {
		const messages = { [locale]: await LocaleService.fetchLocale(locale) };
		return createI18nInstance(locale, messages);
	} catch (err) {
		try {
			console.error('Unable to load translations with this locale. Loading fallback locale from server...');
			const messages = { [DEFAULT_LOCALE]: await LocaleService.fetchLocale(DEFAULT_LOCALE) };
			return createI18nInstance(DEFAULT_LOCALE, messages);
		} catch (error) {
			console.error('Unable to load translations from server', err);
			return createI18nInstance(DEFAULT_LOCALE, fallbackMessages);
		}
	}
};

const createI18nInstance = (locale: Locales, messages: any) => {
	return createI18n({
		legacy: false, // Vuetify does not support the legacy mode of vue-i18n
		locale: locale || DEFAULT_LOCALE,
		fallbackLocale: DEFAULT_LOCALE,
		messages: messages,
		// Using same number formats for each locale
		numberFormats: Object.assign(
			{},
			numberFormats,
			...availableLocales.map(locale => ({
				[numberFormats[locale]['currency']['currency']]: numberFormats[locale],
			}))
		) as I18nOptions['numberFormats'],

		// Using same datetime formats for each locale
		datetimeFormats: Object.assign(
			{},
			...availableLocales.map(locale => ({
				[locale]: datetimeFormats['en-US'],
			}))
		),
	});
};

export const setI18nLanguage = async (i18n: I18n, locale: Locales = DEFAULT_LOCALE) => {
	// Load locale if not available yet.
	if (!i18n.global.availableLocales.includes(locale)) {
		const messages = await LocaleService.fetchLocale(locale);

		if (!messages) {
			return;
		}
		// Add locale.
		i18n.global.setLocaleMessage(locale, messages);
		await nextTick();
	}
	localStorage.setItem(LOCALE_KEY, JSON.stringify(locale));
	(i18n.global.locale as WritableComputedRef<string>).value = locale;
	/**
	 * NOTE:
	 * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
	 * The following is an example for axios.
	 *
	 * axios.defaults.headers.common['Accept-Language'] = locale
	 */
	document.querySelector('html')?.setAttribute('lang', locale);
};
