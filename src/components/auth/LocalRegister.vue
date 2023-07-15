<template>
	<v-form class="card-content" ref="form" @submit.prevent="submitHandler">
		<LocalizedInput v-model="formState.email" :rules="validations.email" variant="underlined" :label="t('email')"
			required />
		<LocalizedInput v-model="formState.password" :rules="validations.password" variant="underlined"
			:label="t('password')" class="mt-5" validate-on="lazy blur" required />
		<LocalizedInput v-model="formState.username" :rules="validations.username" variant="underlined" :counter="20"
			:label="t('username')" class="mt-5" validate-on="lazy blur" required />
		<v-checkbox v-model="formState.agree" :rules="validations.agree" class="mt-5" validate-on="lazy blur" required>
			<template #label>
				<p>{{ t('agree_with').charAt(0).toUpperCase() + t('agree_with').slice(1) + ' ' }}<a target="_blank"
						href="https://old.uinp.gov.ua/publication/derzhavnii-gimn-ukraini">{{ t('app_rules') }}</a>
				</p>
			</template>
		</v-checkbox>
		<v-btn type="submit" :append-icon="mdiSend" color="success" width="100%" class="mt-7">
			{{ t('sign_in') }}
		</v-btn>
	</v-form>
</template>

<script setup lang="ts">
import LocalizedInput from '@/components/UI/LocalizedInput.vue';
import { ref } from 'vue';
import { mdiSend } from '@mdi/js';
import { register } from '@/services/auth';
import { useI18n } from 'vue-i18n';
import { user as validations } from '@/utils/validations';
import { VForm } from 'vuetify/components';

const emit = defineEmits<{
	(e: 'success'): void;
	(e: 'error', err: unknown): void;
}>();

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });

const form = ref<VForm>();
const formState = ref({
	email: '',
	password: '',
	username: '',
	agree: false,
});

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
	if (valid) {
		const { agree, ...data } = formState.value;
		try {
			await register(data);
			emit('success');
		} catch (e) {
			emit('error', e);
		}
	}
}
</script>

<style scoped></style>