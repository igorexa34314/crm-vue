<template>
	<loader v-if="loading" class="main-loader" />
	<v-layout v-else class="app-main-layout">
		<Navbar @click="drawer = !drawer" />

		<Sidebar v-model="drawer" />

		<v-main class="app">
			<div class="app-content pa-5">
				<router-view />
			</div>
		</v-main>

		<v-tooltip activator=".fixed-action-btn" :text="$filters.localize('create_record')"
			content-class="bg-indigo-lighten-3 font-weight-medium">
			<template v-slot:activator="{ attrs }">
				<v-btn color="indigo-lighten-1" size="x-large" class="fixed-action-btn" to="/record" position="fixed"
					icon="mdi-plus" v-bind="attrs" />
			</template>
		</v-tooltip>
	</v-layout>
</template>

<script setup>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import messages from '@/utils/messages.json';
import { useLocalizeFilter } from '@/filters/localizeFilter';

const store = useStore();
const snackbar = getCurrentInstance().appContext.app.config.globalProperties.$snackbar;
const drawer = ref(true);
const loading = ref(true);

onMounted(async () => {
	if (!Object.keys(store.state.info.info).length) {
		await store.dispatch('info/fetchInfo');
	}
	loading.value = false;
});

const error = computed(() => store.state.error);
watch(error, fbError => {
	snackbar.showMessage(messages[fbError.code] || useLocalizeFilter('error_message'), 'red-darken-3', 3000);
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