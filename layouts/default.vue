<template>
	<app-loader v-if="loading" class="main-loader" />
	<v-layout v-else class="app-main-layout">
		<AppNavbar @click="drawer = !drawer" />
		<AppSidebar v-model="drawer" />

		<v-main class="app">
			<div class="app-content pa-5">
				<slot />
			</div>
		</v-main>

		<v-tooltip activator=".fixed-action-btn" :text="t('create_record')"
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
import { fetchCurrency } from '@/api/currency';
import { mdiPlus } from '@mdi/js';
import { fetchInfo } from '@/api/user';

import { currencyKey } from '@/injection-keys';
import messages from '@/utils/fbMessages.json';

const { state: currency, isLoading, isReady, execute: refresh } = useAsyncState(fetchCurrency, null);
provide(currencyKey, { currency, isLoading, isReady, refresh });

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const infoStore = useInfoStore();
const drawer = ref(true);
const loading = ref(false);

watchEffect(async () => {
	try {
		if (!infoStore.info || !Object.keys(infoStore.info).length) {
			await fetchInfo();
		}
		await fetchCurrency();
	} catch (e) {
		const { showMessage } = useSnackbarStore();
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