import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('error', () => {
	const error = ref<Error | null>(null);

	const setError = (err: Error) => {
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
