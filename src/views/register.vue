<template>
	<v-card width="100%" max-width="450" class="pa-3">
		<v-card-title class="mb-2 text-center">{{ t('home_bookkeeping') }}</v-card-title>

		<v-card-text>
			<LocalRegister @success="onRegisterSuccess" @error="onRegisterError" />
		</v-card-text>

		<v-card-actions class="justify-center text-subtitle-1">
			<p class="text-center">
				{{ t('have_account') + '? ' }}
				<router-link to="/login" tag="a">{{ t('login') + '!' }}</router-link>
			</p>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import LocalRegister from '@/components/auth/LocalRegister.vue';
import { useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';
import { useSnackbarStore } from '@/stores/snackbar';
import { useI18n } from 'vue-i18n';
import messages from '@/utils/fbMessages.json';

useMeta({ title: 'sign_in' });

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { push } = useRouter();
const { showMessage } = useSnackbarStore();

const onRegisterSuccess = async () => {
	showMessage(t('sign_in_success'));
	push('/');
}
const onRegisterError = async (e: unknown) => {
	showMessage(t(messages[e as keyof typeof messages]) || e as string);
}
</script>

<route lang="yaml">
meta:
  layout: empty
</route>