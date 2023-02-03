<template>
	<v-layout class="app-main-layout">

		<AppNavbar />

		<AppSidebar />

		<v-main class="app">
			<div class="app-content pa-5">
				<router-view />
			</div>

		</v-main>

		<div class="fixed-action-btn">
			<a class="btn-floating btn-large blue" href="#">
				<i class="large material-icons">add</i>
			</a>
		</div>
	</v-layout>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue';
import AppSidebar from '@/components/AppSidebar.vue';
</script>

<style lang="scss" scoped>
.app {}
</style>