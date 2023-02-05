<template>
	<v-layout class="app-main-layout">
		<Navbar @toggle="drawer = !drawer" />

		<Sidebar v-model="drawer" />

		<v-main class="app">
			<div class="app-content pa-5">
				<router-view />
			</div>

		</v-main>

		<v-btn color="indigo-lighten-1" size="large" class="fixed-action-btn" to="/record" position="fixed"
			icon="mdi-plus" />


	</v-layout>
</template>

<script setup>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';
import { ref } from 'vue';

const drawer = ref(true);
</script>

<style lang="scss" >
.app {}
.fixed-action-btn {
	right: 0;
	bottom: 0;
	transform: translate(-100%, -100%);
}
</style>