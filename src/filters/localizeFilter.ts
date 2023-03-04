import { useInfoStore } from '@/stores/info';
import { Locales } from '@/stores/info';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';
import ua from '@/locales/ua.json';

interface LocaleData {
	[key: string]: any;
}

const locales: LocaleData = {
	'ru-RU': ru,
	'uk-UA': ua,
	'en-US': en
};

export const useLocalizeFilter = (key: string) => {
	const infoStore = useInfoStore();
	const locale: Locales = infoStore.info?.locale || Locales.RU;
	return locales[locale][key] || `[Localize error]: key ${key} not found`;
};
