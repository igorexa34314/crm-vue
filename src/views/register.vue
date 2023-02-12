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
					{{ $filters.localize('sign_in') }}
				</v-btn>
			</v-form>
		</v-card-text>
		<v-card-actions class="justify-center text-subtitle-1">
			<p class="text-center">
				{{ $filters.localize('have_account') + '? ' }}
				<router-link to="/login" tag="a">{{ $filters.localize('login') + '!' }}</router-link>
			</p>
		</v-card-actions>
	</v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, getCurrentInstance } from 'vue';
import { useLocalizeFilter } from '@/filters/localizeFilter';

useMeta({ title: 'sign_in' });

const router = useRouter();
const store = useStore();
const snackbar = getCurrentInstance().appContext.app.config.globalProperties.$snackbar;

const form = ref();
const formValid = ref(true);

const email = ref('');
const password = ref('');
const name = ref('');
const agree = ref(false);

const validations = {
	email: [
		v => !!v || useLocalizeFilter('enter_Email'),
		v => (v && /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v)) || useLocalizeFilter('email_rules'),
	],
	password: [
		v => !!v || useLocalizeFilter('enter_Pass'),
		v => (v && v.length >= 6 && v.length <= 32) || useLocalizeFilter('pass_rules'),
	],
	name: [
		v => !!v || useLocalizeFilter('message_EnterName'),
		v => (v && v.length >= 3 && v.length <= 20) || useLocalizeFilter('name_rules'),
	],
	agree: [
		v => !!v || useLocalizeFilter('agree_rules'),
	]
};

const submitHandler = async () => {
	const { valid } = await form.value.validate();

	if (valid) {
		const formData = {
			email: email.value,
			password: password.value,
			name: name.value,
		};
		try {
			await store.dispatch('auth/register', formData);
			snackbar.showMessage(useLocalizeFilter('sign_in_success'));
			router.push('/');
		} catch (e) { }
	}
}
</script>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  layout: empty
</route>