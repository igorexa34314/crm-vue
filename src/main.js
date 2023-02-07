import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';
import App from './App.vue';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import store from '@/store';
import snackbarPlugin from '@/plugins/snackbar';
import { firebaseApp } from '@/firebase';

const app = createApp(App);
app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()]
});
app.use(router).use(store).use(vuetify).use(snackbarPlugin, { store });

app.mount('#app');
