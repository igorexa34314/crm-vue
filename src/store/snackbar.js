export const snackbarModule = {
	namespaced: true,
	state: () => ({
		text: '',
		color: '',
		timeout: ''
	}),
	mutations: {
		showMessage(state, payload) {
			state.text = payload.text || 'missing "message".';
			state.color = payload.color || 'green-darken-1';
			state.timeout = payload.timeout || 2500;
		}
	},
	actions: {}
};
