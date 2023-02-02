<template>
	<div class="app-main-layout">

		<AppNavbar />

		<AppSidebar />

		<main class="app-content">
			<div class="app-page">

				<router-view />

			</div>
		</main>

		<div class="fixed-action-btn">
			<a class="btn-floating btn-large blue" href="#">
				<i class="large material-icons">add</i>
			</a>
		</div>
	</div>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue';
import AppSidebar from '@/components/AppSidebar.vue';
</script>

<style lang="scss" scoped>

</style>