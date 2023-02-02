import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import 'materialize-css/dist/js/materialize.min';

const app = createApp(App);

app.use(vuetify).use(router).mount('#app');
