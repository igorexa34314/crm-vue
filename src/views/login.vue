<template>
	<v-card max-width="400" width="100%" class="pa-4">
		<v-card-title class="text-center">Домашняя бухгалтерия</v-card-title>
		<v-card-text>
			<v-form>
				<v-text-field v-model="email" :rules="emailRules" variant="underlined" label="Email" required />
				<v-text-field v-model="password" :rules="passwordRules" variant="underlined" label="Пароль" required />
				<v-btn type="submit" width="100%" color="teal-darken-2" class="mt-4" append-icon="mdi-send">Войти</v-btn>
			</v-form>
		</v-card-text>
		<v-card-actions class="mt-3 justify-center">
			<div class="text-center text-subtitle-1">
				Нет аккаунта? <a href="/" class="">Зарегистрироваться</a>
			</div>
		</v-card-actions>
	</v-card>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  layout: empty
</route>