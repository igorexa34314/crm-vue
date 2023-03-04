import { defineStore } from 'pinia';
import { reactive } from 'vue';

export interface Snackbar {
	text: string;
	color: string;
	timeout: number;
}

export const useSnackbarStore = defineStore('snackbar', () => {
	const snackbar: Snackbar = reactive({ text: '', color: 'green-darken-1', timeout: 2000 });

	const showMessage = (text: string, color?: string, timeout?: number) => {
		snackbar.text = text || 'missing "message".';
		snackbar.color = color || 'green-darken-1';
		snackbar.timeout = timeout || 2500;
	};

	return {
		snackbar,
		showMessage
	};
});
