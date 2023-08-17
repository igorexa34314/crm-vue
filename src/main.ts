import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';
import App from '@/App.vue';
import router from '@/router';
import { createMetaManager } from 'vue-meta';
import vuetify from '@/plugins/vuetify';
import { initI18n, setI18nLanguage } from '@/plugins/i18n';
import pinia from '@/plugins/pinia';
import { useInfoStore } from '@/stores/info';
import { firebaseApp } from '@/firebase';
import AppLoader from '@/components/app/AppLoader.vue';

initI18n().then(i18n => {
	const app = createApp(App);

	app.use(VueFire, {
		firebaseApp,
		modules: [VueFireAuth()],
	});

	app.use(router).use(pinia).use(i18n);

	const infoStore = useInfoStore();
	infoStore.$subscribeLocale(locale => setI18nLanguage(i18n, locale));

	app.use(createMetaManager()).use(vuetify(i18n)).component('app-loader', AppLoader);

	app.mount('#app');
});
