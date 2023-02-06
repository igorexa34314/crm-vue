const snackbarPlugin = {
	install: (app, { store }) => {
		if (!store) {
			throw new Error('Please provide vuex store.');
		}

		app.config.globalProperties.$snackbar = {
			showMessage: (text, color, timeout) => {
				store.commit('snackbar/showMessage', { text, color, timeout }, { root: true });
			}
		};
	}
};
export default snackbarPlugin;
