// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// I18n
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import i18n from './i18n';

export const vuetifyThemeNames = {
	dark: 'customDark',
	light: 'customLight'
} as const;

export default createVuetify({
	components,
	directives,
	locale: {
		adapter: createVueI18nAdapter({ i18n, useI18n })
	},
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi
		}
	},
	theme: {
		defaultTheme:
			vuetifyThemeNames[
				import.meta.env.VITE_APP_DEFAULT_THEME as keyof typeof vuetifyThemeNames
			] || vuetifyThemeNames.light,

		themes: {
			[vuetifyThemeNames.dark]: {
				dark: true,
				colors: {
					'card-1': '#5e5a66',
					'card-2': '#575757',
					switch: '#ffffff',
					progress: '#ffffff',
					tooltip: '#46424f',
					fixed: '#8b79ee',
					title: '#E0E0E0',
					subtitle: '#E0E0E0',
					background: '#282828',
					success: '#46424f',
					profile: '#BDBDBD',
					sidebar: '#37474F',
					hover: '#37474f33',
					surface: '#282828',
					primary: '#E0E0E0',
					trend: '#E0E0E0',
					secondary: '#37474F',
					navbar: '#263238'
				}
			},
			[vuetifyThemeNames.light]: {
				dark: false,
				colors: {
					background: '#F8F6F4',
					'card-1': '#99DBF5',
					'card-2': '#FFEEBB',
					title: '#2C3333',
					switch: '#000000',
					progress: '#000000',
					subtitle: '#393646',
					sidebar: '#DEF5E5',
					tooltip: '#FFE1E1',
					hover: '#ffffff66',
					fixed: '#FDCEDF',
					primary: '#393646',
					navbar: '#ECB365',
					profile: '#261C2C',
					trend: '#FFFFFF',
					success: '#4E9F3D'
				}
			}
		}
	}
});
