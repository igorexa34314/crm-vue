import { createStore } from 'vuex';

import { snackbarModule } from '@/store/snackbar';

export default createStore({
	modules: {
		snackbar: snackbarModule
	}
});
