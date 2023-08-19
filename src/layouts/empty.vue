<template>
	<v-layout class="app-layout overflow-hidden bg-grey-darken-2 d-flex justify-center align-center">
		<router-view />
	</v-layout>
</template>

<script setup lang="ts">
import { VLayout } from 'vuetify/components';
import { computed, onUnmounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router/auto';
import { useInfoStore } from '@/stores/info';
import { useSnackbarStore } from '@/stores/snackbar';
import { useI18n } from 'vue-i18n';

const { t, te } = useI18n({ inheritLocale: true, useScope: 'global' });
const infoStore = useInfoStore();
const info = computed(() => infoStore.info);
const { showMessage } = useSnackbarStore();
const route = useRoute();
const { replace } = useRouter();

if (!info.value?.locale) {
	infoStore.setLocale();
}
watchEffect(() => {
	if (te(`firebase.messages.${route.query.message}`)) {
		showMessage(t(`firebase.messages.${route.query.message}`));
		replace({ query: undefined });
	}
});

onUnmounted(() => {
	infoStore.$reset();
});
</script>

<style scoped>
.app-layout {
	min-height: 100dvh;
	min-height: 100vh;
}
</style>
