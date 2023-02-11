import store from '@/store';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';
import ua from '@/locales/ua.json';

const locales = {
	'ru-RU': ru,
	'uk-UA': ua,
	'en-US': en
};

export const useLocalizeFilter = key => {
	const locale = store.state.info.info.locale || 'ru-RU';
	return locales[locale][key] || `[Localize error]: key ${key} not found`;
};
