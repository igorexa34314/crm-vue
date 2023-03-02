import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSnackbarStore = defineStore('snackbar', () => {
	const text = ref('');
	const color = ref('');
	const timeout = ref(1000);

	const getAllParams = computed(() => ({ text: text.value, color: color.value, timeout: timeout.value }));
	const showMessage = (txt: string, clr?: string, tmt?: number) => {
		text.value = txt || 'missing "message".';
		color.value = clr || 'green-darken-1';
		timeout.value = tmt || 2500;
	};

	return {
		text,
		color,
		timeout,
		getAllParams,
		showMessage
	};
});
