<template>
	<v-card width="100%" max-width="450" class="pa-3">
		<v-card-title class="mb-2 text-center">Домашняя бухгалтерия</v-card-title>
		<v-card-text>
			<v-form class="card-content" ref="form" v-model="formValid" @submit.prevent="submitHandler">
				<v-text-field v-model="email" :rules="validations.email" variant="underlined" label="Email" required />
				<v-text-field v-model="password" :rules="validations.password" variant="underlined" label="Пароль"
					class="mt-5" required />
				<v-text-field v-model="name" :rules="validations.name" variant="underlined" :counter="20" label="Имя"
					class="mt-5" required />
				<v-checkbox v-model="agree" :rules="validations.agree" class="mt-5" required>
					<template v-slot:label>
						<p>С <a target="_blank" href="#">правилами</a>
							согласен
						</p>
					</template>
				</v-checkbox>
				<v-btn type="submit" append-icon="mdi-send" color="teal-lighten-1" width="100%" class="mt-7">
					Зарегистрироваться
				</v-btn>
			</v-form>
		</v-card-text>
		<v-card-actions class="justify-center text-subtitle-1">
			<p class="text-center">
				Уже есть аккаунт?
				<router-link to="/login" tag="a">Войти!</router-link>
			</p>
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
const name = ref('');
const agree = ref(false);

const validations = {
	email: [
		v => !!v || 'Введите email',
		v => (v && /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v)) || 'Введите корректный email',
	],
	password: [
		v => !!v || 'Введите пароль',
		v => (v && v.length >= 6 && v.length <= 32) || 'Пароль должен быть в пределах от 6 до 32 символов',
	],
	name: [
		v => !!v || 'Введите имя пользователя',
		v => (v && v.length >= 2 && v.length <= 20) || 'Имя должно быть в пределах от 2 до 20 символов',
	],
	agree: [
		v => !!v || 'Вы должны согласиться с правилами',
	]
};

const submitHandler = async () => {
	const { valid } = await form.value.validate();

	if (valid) {
		const formData = {
			email: email.value,
			name: name.value,
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