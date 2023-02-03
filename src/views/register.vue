<template>
	<v-card width="100%" max-width="450" class="pa-5">
		<v-card-title class="mb-2 text-center">Домашняя бухгалтерия</v-card-title>
		<v-card-text>
			<v-form class="card-content">
				<v-text-field v-model="email" :rules="emailRules" variant="underlined" label="Email" required />
				<v-text-field v-model="password" :rules="passwordRules" variant="underlined" label="Пароль" required />
				<v-text-field v-model="name" :rules="nameRules" variant="underlined" :counter="16" label="Имя" required />
				<v-checkbox v-model="checkbox">
					<template v-slot:label>
						<div>С <a target="_blank" href="#">правилами</a>
							согласен
						</div>
					</template>
				</v-checkbox>
				<v-btn type="submit" append-icon="mdi-send" color="teal-lighten-1" width="100%">
					Зарегистрироваться
				</v-btn>
			</v-form>
		</v-card-text>
		<v-card-actions class="justify-center text-subtitle-1">
			<p class="text-center">
				Уже есть аккаунт?
				<a href="#">Войти!</a>
			</p>
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