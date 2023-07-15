<template>
	<app-loader v-if="loading" class="main-loader" />
	<v-layout v-else class="app-main-layout" full-height>
		<AppNavbar @click="drawer = !drawer" @logout="logout" />
		<AppSidebar v-model="drawer" />

		<v-main class="app bg-background" style="min-height: 100vh">
			<div class="app-content pa-5">
				<router-view />
			</div>
		</v-main>

		<v-tooltip activator=".fixed-action-btn" :text="t('create_record')"
			content-class="bg-fixed text-primary font-weight-medium">
			<template #activator="{ props }">
				<v-btn color="fixed" :size="xs ? 'default' : mdAndDown ? 'large' : 'x-large'" class="fixed-action-btn"
					to="/record" position="fixed" :icon="mdiPlus" v-bind="props" />
			</template>
		</v-tooltip>
	</v-layout>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/app/AppNavbar.vue';
import AppSidebar from '@/components/app/AppSidebar.vue';
import { ref, onMounted, provide, onUnmounted } from 'vue';
import { fetchCurrency } from '@/services/currency';
import { useInfoStore } from '@/stores/info';
import { mdiPlus } from '@mdi/js';
import { fetchInfo } from '@/services/user';
import { useI18n } from 'vue-i18n';
import { useSnackbarStore } from '@/stores/snackbar';
import { useAsyncState } from '@vueuse/core';
import { currencyKey } from '@/injection-keys';
import messages from '@/utils/fbMessages.json';
import { Unsubscribe } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { logout as exit } from '@/services/auth';
import { useDisplay } from 'vuetify';

let unsub: Unsubscribe | undefined;
const { state: currency, isLoading, isReady, execute: refresh } = useAsyncState(fetchCurrency, null);
provide(currencyKey, { currency, isLoading, isReady, refresh });

const { push } = useRouter();
const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const infoStore = useInfoStore();
const drawer = ref(true);
const loading = ref(false);
const { xs, mdAndDown } = useDisplay();

onMounted(async () => {
	try {
		if (!infoStore.info || !Object.keys(infoStore.info).length) {
			unsub = await fetchInfo();
		}
		await fetchCurrency();
	} catch (e) {
		const { showMessage } = useSnackbarStore();
		showMessage(messages[e as keyof typeof messages] || e as string);
	} finally {
		loading.value = false;
	}
});

onUnmounted(() => {
	unsub?.();
});

const logout = async () => {
	unsub?.();
	await exit();
	push({
		path: '/login',
		query: {
			message: 'logout'
		}
	})
}

</script>

<style scoped>
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