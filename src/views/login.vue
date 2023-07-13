<template>
	<v-card max-width="450" width="100%" class="pa-4">
		<v-card-title class="text-center">{{ t('home_bookkeeping') }}</v-card-title>

		<v-card-text>
			<LocalLogin @success="onLoginSuccess" @error="onLoginError" />

			<div class="providers d-flex align-center mt-6 justify-center">
				<GoogleProvider @success="onLoginSuccess" @error="onLoginError" />
			</div>
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
import LocalLogin from '@/components/auth/LocalLogin.vue';
import GoogleProvider from '@/components/auth/providers/GoogleProvider.vue';
import { useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';
import { useSnackbarStore } from '@/stores/snackbar';
import { useI18n } from 'vue-i18n';
import messages from '@/utils/fbMessages.json';

useMeta({ title: 'login' });

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { push } = useRouter();
const { showMessage } = useSnackbarStore();

const onLoginSuccess = () => {
	showMessage(t('login_success'));
	push('/');
}
const onLoginError = (e: unknown) => {
	showMessage(messages[e as keyof typeof messages] || t('login_error'));
}
</script>

<route lang="yaml">
meta:
  layout: empty
</route>