import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import { vuetifyThemeNames } from '@/plugins/vuetify';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
	const theme = useTheme();
	const darkMode = ref<boolean>(true);

	const setDarkMode = (value?: boolean) => {
		darkMode.value =
			value ??
			(JSON.parse(localStorage.getItem('darkMode') || 'null') as boolean) ??
			theme.global.current.value.dark ??
			true;
	};

	setDarkMode();

	watch(
		darkMode,
		newVal => {
			localStorage.setItem('darkMode', JSON.stringify(darkMode.value));
			theme.global.name.value = newVal ? vuetifyThemeNames.dark : vuetifyThemeNames.light;
		},
		{ immediate: true }
	);

	return { darkMode };
});
