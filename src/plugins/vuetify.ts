// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import { mdi, aliases } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
	components,
	directives,
	aliases,
	icons: {
		defaultSet: 'mdi',
		sets: {
			mdi
		}
	}
});
