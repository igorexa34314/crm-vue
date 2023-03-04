<template>
	<v-layout class="app bg-grey-darken-2">
		<router-view />
	</v-layout>
</template>

<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useInfoStore } from '@/stores/info';
import { useErrorStore } from '@/stores/error';
import { useSnackbarStore } from '@/stores/snackbar';
import messages from '@/utils/messages.json';

const infoStore = useInfoStore();
const errorStore = useErrorStore();
const { showMessage } = useSnackbarStore();

if (infoStore.info && !infoStore.info.locale) {
	infoStore.setLocale();
}
const error = computed(() => errorStore.error);

watch(error, newErr => {
	showMessage(messages[newErr.code] || useLocalizeFilter('error_message'), 'red-darken-3', 3000);
});
onUnmounted(() => {
	infoStore.clearInfo();
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