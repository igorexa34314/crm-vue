<template>
	<v-card width="100%" max-width="450" class="pa-3">
		<v-card-title class="mb-2 text-center">{{ t('home_bookkeeping') }}</v-card-title>
		<v-card-text>
			<v-form class="card-content" ref="form" @submit.prevent="submitHandler">
				<LocalizedInput v-model="formState.email" :rules="validations.email" variant="underlined" :label="t('email')"
					required />
				<LocalizedInput v-model="formState.password" :rules="validations.password" variant="underlined"
					:label="t('password')" class="mt-5" validate-on="lazy blur" required />
				<LocalizedInput v-model="formState.name" :rules="validations.name" variant="underlined" :counter="20"
					:label="t('name')" class="mt-5" validate-on="lazy blur" required />
				<v-checkbox v-model="formState.agree" :rules="validations.agree" class="mt-5" validate-on="lazy blur" required>
					<template #label>
						<p>{{ t('agree_with').charAt(0).toUpperCase() + t('agree_with').slice(1) + ' ' }}<a target="_blank"
								href="https://old.uinp.gov.ua/publication/derzhavnii-gimn-ukraini">{{ t('rules') }}</a>
						</p>
					</template>
				</v-checkbox>
				<v-btn type="submit" :append-icon="mdiSend" color="teal-lighten-1" width="100%" class="mt-7">
					{{ t('sign_in') }}
				</v-btn>
			</v-form>
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
import LocalizedInput from '@/components/UI/LocalizedInput.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';
import { mdiSend } from '@mdi/js';
import { register } from '@/api/auth';
import { useSnackbarStore } from '@/stores/snackbar';
import { useI18n } from 'vue-i18n';
import { user as validations } from '@/utils/validations';
import { VForm } from 'vuetify/components';
import messages from '@/utils/fbMessages.json';

useMeta({ title: 'sign_in' });

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { push } = useRouter();
const { showMessage } = useSnackbarStore();

const form = ref<VForm>();
const formState = ref({
	email: '',
	password: '',
	name: '',
	agree: false,
});

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
	if (valid) {
		const { agree, ...data } = formState.value;
		try {
			await register(data);
			showMessage(t('sign_in_success'));
			push('/');
		} catch (e) {
			showMessage(t(messages[e as keyof typeof messages]) || e as string);
		}
	}
}
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: empty
</route>