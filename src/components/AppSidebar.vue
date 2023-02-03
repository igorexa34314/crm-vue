<template>
	<v-navigation-drawer v-model="drawer" location="left">
		<v-list>
			<v-list-item title="Счет"></v-list-item>
			<v-list-item title="История"></v-list-item>
			<v-list-item title="Планирование"></v-list-item>
			<v-list-item title="Новая запись"></v-list-item>
			<v-list-item title="Категории"></v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
const drawer = ref(true);
</script>

<style lang="scss" scoped>

</style>