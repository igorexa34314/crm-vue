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
	}
});
