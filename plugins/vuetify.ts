// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.use(
		createVuetify({
			ssr: true,
			components,
			directives,
			icons: {
				defaultSet: 'mdi',
				aliases,
				sets: {
					mdi
				}
			}
		})
	);
});
