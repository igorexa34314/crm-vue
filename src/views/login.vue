<template>
	<v-card max-width="450" width="100%" class="pa-4">
		<v-card-title class="text-center">{{ useLocalizeFilter('home_bookkeeping') }}</v-card-title>
		<v-card-text>
			<v-form @submit.prevent="submitHandler" ref="form">
				<v-text-field v-model.trim="formState.email" :rules="validations.email" variant="underlined" label="Email"
					class="mt-4" required />
				<v-text-field v-model.trim="formState.password" :rules="validations.password" variant="underlined"
					label="Пароль" class="mt-6" required />
				<v-btn type="submit" width="100%" color="teal-darken-2" class="mt-8" :append-icon="mdiSend">
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
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import { useMeta } from 'vue-meta';
import { mdiSend } from '@mdi/js';
import { login } from '@/api/auth';
import { useSnackbarStore } from '@/stores/snackbar';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { user as validations } from '@/utils/validations';
import { VForm } from 'vuetify/components';

useMeta({ title: 'login' });

const { push } = useRouter();
const { showMessage } = useSnackbarStore();

const form = ref<VForm>();

const formState = reactive({
	email: '',
	password: ''
});

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
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