<template>
	<v-card width="100%" max-width="450" class="pa-3">
		<v-card-title class="mb-2 text-center">Домашняя бухгалтерия</v-card-title>
		<v-card-text>
			<v-form class="card-content" ref="form" @submit.prevent="submitHandler">
				<v-text-field v-model="formState.email" :rules="validations.email" variant="underlined" label="Email"
					required />
				<v-text-field v-model="formState.password" :rules="validations.password" variant="underlined" label="Пароль"
					class="mt-5" required />
				<v-text-field v-model="formState.name" :rules="validations.name" variant="underlined" :counter="20" label="Имя"
					class="mt-5" required />
				<v-checkbox v-model="formState.agree" :rules="validations.agree" class="mt-5" required>
					<template #label>
						<p>С <a target="_blank" href="#">правилами</a>
							согласен
						</p>
					</template>
				</v-checkbox>
				<v-btn type="submit" :append-icon="mdiSend" color="teal-lighten-1" width="100%" class="mt-7">
					{{ useLocalizeFilter('sign_in') }}
				</v-btn>
			</v-form>
		</v-card-text>
		<v-card-actions class="justify-center text-subtitle-1">
			<p class="text-center">
				{{ useLocalizeFilter('have_account') + '? ' }}
				<router-link to="/login" tag="a">{{ useLocalizeFilter('login') + '!' }}</router-link>
			</p>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';
import { mdiSend } from '@mdi/js';
import { register } from '@/api/auth';
import { useSnackbarStore } from '@/stores/snackbar';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { user as validations } from '@/utils/validations';
import { VForm } from 'vuetify/components';

useMeta({ title: 'sign_in' });

const { push } = useRouter();
const { showMessage } = useSnackbarStore();

const form = ref<VForm>();
const formState = reactive({
	email: '',
	password: '',
	name: '',
	agree: false,
});

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
	if (valid) {
		const { agree, ...data } = formState;
		try {
			await register(data);
			showMessage(useLocalizeFilter('sign_in_success'));
			push('/');
		} catch (e) {
			showMessage(useLocalizeFilter(e as string) || e as string);
		}
	}
}
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: empty
</route>