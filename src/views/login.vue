<template>
	<v-card max-width="450" width="100%" class="pa-4">
		<v-card-title class="text-center">{{ useLocalizeFilter('home_bookkeeping') }}</v-card-title>
		<v-card-text>
			<v-form @submit.prevent="submitHandler" ref="form">
				<v-text-field v-model.trim="formState.email" :rules="validations.email" variant="underlined" label="Email"
					class="mt-4" required />
				<v-text-field v-model.trim="formState.password" :rules="validations.password" variant="underlined"
					label="Пароль" class="mt-6" required />
				<v-btn type="submit" width="100%" color="teal-darken-2" class="mt-8" append-icon="mdi-send">
					{{ useLocalizeFilter('login') }}</v-btn>
			</v-form>
		</v-card-text>
		<v-card-actions class="mt-3 justify-center">
			<div class="text-center text-subtitle-1">
				{{ useLocalizeFilter('no_account') + '? ' }}
				<router-link to="/register" tag="a">
					{{ useLocalizeFilter('sign_in') }}</router-link>
			</div>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';
import messages from '@/utils/messages.json';
import { useAuth } from '@/composables/auth';
import { useSnackbarStore } from '@/stores/snackbar';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useMeta } from 'vue-meta';
import { user as validations } from '@/utils/validations'

useMeta({ title: 'login' });

const { login } = useAuth()
const { push } = useRouter();
const route = useRoute();
const { showMessage } = useSnackbarStore();

const form = ref();

const formState = reactive({
	email: '',
	password: ''
});

onMounted(() => {
	const msg = route.query.message as string;
	if (messages[msg]) {
		showMessage(useLocalizeFilter(messages[msg]));
	}
});
const submitHandler = async () => {
	const { valid } = await form.value.validate();

	if (valid) {
		try {
			await login(formState);
			showMessage(useLocalizeFilter('login_success'));
			push('/');
		} catch (e) {
			showMessage(useLocalizeFilter('login_error'));
		}
	}
}
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: empty
</route>