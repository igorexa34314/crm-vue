<template>
	<v-switch v-model="darkMode" color="primary" :false-icon="mdiWeatherNight" :true-icon="mdiWeatherSunny" hide-details />
</template>

<script setup lang="ts">
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import { vuetifyThemeNames } from '@/plugins/vuetify';

const theme = useTheme();
const darkMode = ref(theme.global.current.value.dark);

watch(darkMode, (newVal) => {
	theme.global.name.value = newVal ? vuetifyThemeNames.dark : vuetifyThemeNames.light;
}, { immediate: true })
</script>
