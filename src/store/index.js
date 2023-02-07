import { createStore } from 'vuex';

import { snackbarModule } from '@/store/snackbar';
import { authModule } from '@/store/auth';
import { infoModule } from '@/store/info';

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
	modules: {
		snackbar: snackbarModule,
		auth: authModule,
		info: infoModule
	}
});
