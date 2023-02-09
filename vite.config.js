import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 3000
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},

	plugins: [
		vue({ template: { transformAssetUrls } }),
		Pages({
			dirs: 'src/views',
			extendRoute(route) {
				if (route.path === '/login' || route.path === '/register') {
					return route;
				}
				return {
					...route,
					meta: { auth: true }
				};
			}
		}),
		Layouts({
			layoutsDirs: 'src/layouts',
			defaultLayout: 'main'
		}),
		vuetify()
	]
});
