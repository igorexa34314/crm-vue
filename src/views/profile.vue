<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">Профиль</h3>
		</div>
		<v-form class="profile-form">
			<v-text-field v-model="name" :rules="nameRules" variant="underlined" label="Имя" />

			<v-btn type="submit" color="teal-darken-2">
				Обновить
				<v-icon icon="mdi-send" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>