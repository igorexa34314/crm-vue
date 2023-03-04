import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('error', () => {
	const error = ref<Error | unknown | null>(null);

	const setError = (err: unknown) => {
		error.value = err;
	};

	const clearError = () => {
		error.value = null;
	};

	return {
		error,
		setError,
		clearError
	};
});
