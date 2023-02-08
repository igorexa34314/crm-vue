import { createStore } from 'vuex';

import { snackbarModule } from '@/store/snackbar';
import { authModule } from '@/store/auth';
import { infoModule } from '@/store/info';
import { categoryModule } from '@/store/category';
import { recordModule } from '@/store/record';

export default createStore({
	state: () => ({
		error: null
	}),
	mutations: {
		setError(state, error) {
			state.error = error;
		},
		clearError(state) {
			state.error = null;
		}
	},
	actions: {
		async fetchCurrency() {
			try {
				const res = await fetch('https://api.apilayer.com/exchangerates_data/latest?base=USD&symbols=EUR%2C%20UAH%2C%20USD', {
					method: 'GET',
					redirect: 'follow',
					headers: new Headers({
						'apikey': import.meta.env.VITE_APILAYER_API_KEY
					})
				});
				return await res.json();
			} catch (e) {
				commit('setError', e);
				throw e;
			}
		}
	},
	modules: {
		snackbar: snackbarModule,
		auth: authModule,
		info: infoModule,
		category: categoryModule,
		record: recordModule
	}
});
