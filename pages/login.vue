<template>
	<v-card max-width="450" width="100%" class="pa-4">
		<v-card-title class="text-center">{{ t('home_bookkeeping') }}</v-card-title>
		<v-card-text>
			<v-form @submit.prevent="submitHandler" ref="form">
				<LocalizedInput v-model.trim="formState.email" :rules="validations.email" variant="underlined" label="Email"
					class="mt-4" required />
				<LocalizedInput v-model.trim="formState.password" :rules="validations.password" variant="underlined"
					label="Пароль" class="mt-6" required />
				<v-btn type="submit" width="100%" color="teal-darken-2" class="mt-8" :append-icon="mdiSend">
					{{ t('login') }}</v-btn>
			</v-form>
		</v-card-text>
		<v-card-actions class="mt-3 justify-center">
			<div class="text-center text-subtitle-1">
				{{ t('no_account') + '? ' }}
				<router-link to="/register" tag="a">
					{{ t('sign_in') }}</router-link>
			</div>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import LocalizedInput from '@/components/UI/LocalizedInput.vue';
import { mdiSend } from '@mdi/js';
import { login } from '@/api/auth';
import { user as validations } from '@/utils/validations';
import messages from '@/utils/fbMessages.json';
import { VForm } from 'vuetify/components';

definePageMeta({ layout: 'empty', middleware: ['auth'] });
useHead({ title: 'login' });

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { showMessage } = useSnackbarStore();

const form = ref<VForm>();

const formState = ref({
	email: '',
	password: ''
});

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
	if (valid) {
		try {
			await login(formState.value);
			showMessage(t('login_success'));
			navigateTo('/');
		} catch (e) {
			showMessage(messages[e as keyof typeof messages] || t('login_error'));
		}
	}
}
</script>

<style lang="scss" scoped></style>