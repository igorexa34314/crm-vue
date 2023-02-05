<template>
	<v-card max-width="450" width="100%" class="pa-4">
		<v-card-title class="text-center">Домашняя бухгалтерия</v-card-title>
		<v-card-text>
			<v-form @submit.prevent="submitHandler" ref="form" v-model="formValid">
				<v-text-field v-model.trim="email" :rules="validations.email" variant="underlined" label="Email"
					class="mt-4" required />
				<v-text-field v-model.trim="password" :rules="validations.password" variant="underlined" label="Пароль"
					class="mt-6" required />
				<v-btn type="submit" width="100%" color="teal-darken-2" class="mt-8" append-icon="mdi-send">Войти</v-btn>
			</v-form>
		</v-card-text>
		<v-card-actions class="mt-3 justify-center">
			<div class="text-center text-subtitle-1">
				Нет аккаунта? <router-link to="/register" tag="a">Зарегистрироваться</router-link>
			</div>
		</v-card-actions>
	</v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();

const form = ref();
const formValid = ref(true);

const email = ref('');
const password = ref('');

const validations = {
	email: [
		v => !!v || 'Введите email',
		v => (v && /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v)) || 'Введите корректный email',
	],
	password: [
		v => !!v || 'Введите пароль',
		v => (v && v.length >= 6 && v.length <= 32) || 'Пароль должен быть в пределах от 6 до 32 символов',
	],
};

const submitHandler = async () => {
	const { valid } = await form.value.validate();

	if (valid) {
		const formData = {
			email: email.value,
			password: password.value,
		};
		console.log(formData)
		router.push('/');
	}
}
</script>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  layout: empty
</route>