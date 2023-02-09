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

		<v-tooltip activator=".fixed-action-btn" text="Создать новую запись"
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
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const drawer = ref(true);
const loading = ref(true);

onMounted(async () => {
	if (!Object.keys(store.state.info.info).length) {
		await store.dispatch('info/fetchInfo');
	}
	loading.value = false;
});
</script>

<style lang="scss" scoped>
.app {}
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
.main-loader {}
</style>