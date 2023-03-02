import { useInfoStore } from '@/stores/info';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';
import ua from '@/locales/ua.json';

const locales = {
	'ru-RU': ru,
	'uk-UA': ua,
	'en-US': en
};

export const useLocalizeFilter = (key: string) => {
	const infoStore = useInfoStore();
	const locale = infoStore.info.locale || 'ru-RU';
	return locales[locale][key] || `[Localize error]: key ${key} not found`;
};
