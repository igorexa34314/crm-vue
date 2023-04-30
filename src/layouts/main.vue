<template>
	<app-loader v-if="loading" class="main-loader" />
	<v-layout v-else class="app-main-layout">
		<AppNavbar @click="drawer = !drawer" />
		<AppSidebar v-model="drawer" />

		<v-main class="app">
			<div class="app-content pa-5">
				<router-view />
			</div>
		</v-main>

		<v-tooltip activator=".fixed-action-btn" :text="useLocalizeFilter('create_record')"
			content-class="bg-indigo-lighten-3 font-weight-medium">
			<template #activator="{ props }">
				<v-btn color="indigo-lighten-1" size="x-large" class="fixed-action-btn" to="/record" position="fixed"
					:icon="mdiPlus" v-bind="props" />
			</template>
		</v-tooltip>
	</v-layout>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/app/AppNavbar.vue';
import AppSidebar from '@/components/app/AppSidebar.vue';
import { ref, watchEffect } from 'vue';
import { useInfoStore } from '@/stores/info';
import { mdiPlus } from '@mdi/js';
import { fetchInfo } from '@/api/userinfo';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useSnackbarStore } from '@/stores/snackbar';
import messages from '@/utils/messages.json';

const infoStore = useInfoStore();
const { showMessage } = useSnackbarStore();
const drawer = ref(true);
const loading = ref(false);

watchEffect(async () => {
	try {
		if (!infoStore.info || !Object.keys(infoStore.info).length) {
			await fetchInfo();
		}
	} catch (e) {
		showMessage(messages[e as keyof typeof messages] || e as string);
	} finally {
		loading.value = false;
	}
});
</script>

<style lang="scss" scoped>
.fixed-action-btn {
	right: 0;
	bottom: 0;
	transform: translate(-70%, -70%);
}
.main-loader {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 100;
}
</style>