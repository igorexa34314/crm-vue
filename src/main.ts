import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';
import App from '@/App.vue';
import router from '@/router';
import { createMetaManager } from 'vue-meta';
import vuetify from '@/plugins/vuetify';
import i18n from './plugins/i18n';
import { createPinia } from 'pinia';
import { useInfoStore } from '@/stores/info';
import { firebaseApp } from '@/firebase';
import AppLoader from '@/components/app/AppLoader.vue';

declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		AppLoader: typeof AppLoader;
	}
}

const app = createApp(App);
app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()]
});
app.use(router).use(i18n).use(createPinia()).use(createMetaManager()).use(vuetify);
app.component('app-loader', AppLoader);
app.mount('#app');

useInfoStore().$subscribe((_, state) => {
	i18n.global.locale.value = state.info?.locale || 'en-US';
});
