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
			<template v-slot:activator="{ props }">
				<v-btn color="indigo-lighten-1" size="x-large" class="fixed-action-btn" to="/record" position="fixed"
					icon="mdi-plus" v-bind="props" />
			</template>
		</v-tooltip>
	</v-layout>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/app/AppNavbar.vue';
import AppSidebar from '@/components/app/AppSidebar.vue';
import { ref, computed, watch, onMounted } from 'vue';
import { useErrorStore } from '@/stores/error';
import { useInfoStore } from '@/stores/info';
import messages from '@/utils/messages.json';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useSnackbarStore } from '@/stores/snackbar';

const errorStore = useErrorStore();
const infoStore = useInfoStore();
const { showMessage } = useSnackbarStore();
const drawer = ref(true);
const loading = ref(true);

onMounted(async () => {
	if (!Object.keys(infoStore.info).length) {
		await infoStore.fetchInfo();
	}
	loading.value = false;
});

const error = computed(() => errorStore.error);
watch(error, newErr => {
	showMessage(messages[newErr.code] || useLocalizeFilter('error_message'), 'red-darken-3', 3000);
})
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