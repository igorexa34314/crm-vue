import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';
import App from './App.vue';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import store from '@/store';
import snackbarPlugin from '@/plugins/snackbar';
import { firebaseApp } from '@/firebase';
import Loader from '@/components/app/Loader.vue';
import Snackbar from '@/components/app/Snackbar.vue';
import filters from '@/plugins/filters';

const app = createApp(App);
app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()]
});
app.use(router).use(store).use(vuetify);
app.use(filters);
app.use(snackbarPlugin, { store });
app.component('loader', Loader);
app.component('snackbar', Snackbar);
app.mount('#app');
