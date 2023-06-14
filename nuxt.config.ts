// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	imports: {
		dirs: ['composables/**', 'utils/**', 'components/**', 'stores/**']
	},
	// app config
	app: {
		// global transition
		pageTransition: { name: 'page', mode: 'out-in' },
		layoutTransition: { name: 'layout', mode: 'out-in' },
		head: {
			htmlAttrs: {
				lang: 'ru'
			},
			title: 'CRM Vue',
			noscript: [{ children: 'JavaScript is required' }],
			style: [{ children: ':root { overflow-y: auto }' }],
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1.0',
			meta: [{ name: 'description', content: 'CRM System on Vue 3' }],
			link: [
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '192x192',
					href: '/fav/android-chrome-192x192.png'
				},
				{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/fav/favicon-32x32.png' },
				{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/fav/favicon-16x16.png' },
				{ rel: 'icon', type: 'image/x-icon', sizes: '16x16', href: '/fav/favicon.ico' }
			]
		}
	},
	modules: ['nuxt-vuefire', '@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/i18n'],
	// i18n: { vueI18n: './i18n.config.ts' },
	vuefire: {
		// ensures the auth module is enabled
		auth: true,
		admin: {
			serviceAccount: import.meta.env.VITE_FB_SERVICE_ACCOUNT
		},
		config: {
			apiKey: import.meta.env.VITE_FB_API_KEY,
			authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
			projectId: import.meta.env.VITE_FB_PROJECT_ID,
			storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
			messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
			appId: import.meta.env.VITE_FB_APP_ID,
			measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
			databaseURL: import.meta.env.VITE_FB_DATABASE_URL
		}
	},
	i18n: {
		vueI18n: './locales/i18n.config.ts'
	},
	pinia: {
		autoImports: ['defineStore', 'storeToRefs']
	},
	css: ['vuetify/styles'],
	build: {
		transpile: ['vuetify']
	},
	vite: {
		ssr: {
			noExternal: ['vuetify']
		},
		define: {
			'process.env.DEBUG': false
		}
	}
});
