<template>
	<v-layout class="app bg-grey-darken-2">
		<router-view />
	</v-layout>
</template>

<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useInfoStore } from '@/stores/info';
import { useSnackbarStore } from '@/stores/snackbar';
import { useI18n } from 'vue-i18n';
import messages from '@/utils/fbMessages.json';

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const infoStore = useInfoStore();
const { setLocale, $reset } = infoStore;
const info = computed(() => infoStore.info);
const { showMessage } = useSnackbarStore();
const { query } = useRoute();

if (!info.value?.locale) {
	setLocale();
}
watch(() => query.message, () => {
	if (messages[query.message as keyof typeof messages]) {
		showMessage(t(messages[query.message as keyof typeof messages]));
	}
}, { deep: true, immediate: true });

onUnmounted(() => {
	$reset();
});
</script>

<style scoped>
.app {
	min-height: 100vh;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>