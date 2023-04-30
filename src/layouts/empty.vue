<template>
	<v-layout class="app bg-grey-darken-2">
		<router-view />
	</v-layout>
</template>

<script setup lang="ts">
import { computed, onUnmounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useInfoStore } from '@/stores/info';
import { useSnackbarStore } from '@/stores/snackbar';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import messages from '@/utils/messages.json';

const infoStore = useInfoStore();
const { setLocale, $reset } = infoStore;
const { query } = useRoute();
const info = computed(() => infoStore.info);
const { showMessage } = useSnackbarStore();

if (info.value && !info.value.locale) {
	setLocale();
}
watchEffect(() => {
	if (messages[query.message as keyof typeof messages]) {
		showMessage(useLocalizeFilter(messages[query.message as keyof typeof messages]));
	}
});
onUnmounted(() => {
	$reset();
});
</script>

<style lang="scss" scoped>
.app {
	min-height: 100vh;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>