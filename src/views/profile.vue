<template>
	<div>
		<div class="title text-title">
			<h3 class="text-h5 text-sm-h4 mt-2 mt-sm-4 ml-2">{{ t('pageTitles.profile') }}</h3>
		</div>
		<v-form ref="form" @submit.prevent="submitHandler" class="profile-form mt-6 mt-sm-8 px-2 px-sm-4">
			<LocalizedInput v-model="formState.username" :rules="validations.username" variant="underlined"
				:label="t('user.username')" class="mb-5" required />

			<div class="d-flex flex-column items-center mb-4 flex-sm-row">
				<LocalizedInput v-model="formState.firstName" :rules="validations.firstName" variant="underlined"
					:label="t('user.firstName')" class="mr-sm-3" />
				<LocalizedInput v-model="formState.lastName" :rules="validations.lastName" variant="underlined"
					:label="t('user.lastName')" class="ml-sm-3" />
			</div>

			<div class="d-flex flex-column flex-md-row">
				<div class="flex-fill d-flex flex-column">
					<BirthdayPicker v-model="formState.birthdayDate" :label="t('user.birthday')" class="flex-fill" />

					<v-radio-group v-model="formState.gender" :label="t('user.gender.label')" class="text-input">
						<v-radio v-for="gender in genderItems" :key="gender.value" :label="gender.title" :value="gender.value"
							color="radio" />
					</v-radio-group>
				</div>
				<div :style="{ 'max-width': smAndDown ? 'none' : '40%', width: '100%' }"
					class="d-flex flex-column pl-4 mt-md-0 my-4">
					<v-card variant="flat" :max-width="smAndDown ? 200 : 250" class="mb-5" elevation="4">
						<v-img :lazy-src="avatarPlaceholder" :src="formState.photoURL || avatarPlaceholder" alt="Ваш аватар"
							cover eager>
							<template #placeholder>
								<ImageLoader />
							</template>
						</v-img>
					</v-card>
					<div class="mb-3 text-subtitle">{{ t('upload_avatar') }}</div>
					<v-file-input v-model="formState.avatar" :label="t('user.avatar')" :rules="validations.file" variant="solo"
						:placeholder="t('upload_avatar')" accept="image/* " :density="xs ? 'compact' : 'comfortable'" single-line
						style="max-width: 550px;" class="text-primary" />
				</div>
			</div>


			<LocalizedTextarea v-model="formState.bio" rows="1" auto-grow :label="t('user.bio')" :rules="validations.bio"
				class="mb-4" />

			<div class="d-flex flex-column items-center mt-4 flex-sm-row">
				<v-select v-model="formState.locale" :items="locales" :label="t('lang')" item-title="title" item-value="value"
					variant="underlined" class="mr-sm-4 text-input" />

				<v-select v-model="formState.currency" :items="currencies" :label="t('currency')" item-title="title"
					item-value="value" variant="underlined" class="ml-sm-4 text-input" />
			</div>

			<v-btn type="submit" color="success" :class="xs ? 'mt-3' : 'mt-5'">
				{{ t('update') }}
				<v-icon :icon="mdiSend" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import ImageLoader from '@/components/app/ImageLoader.vue';
import avatarPlaceholder from '@/assets/img/avatar-placeholder.jpg';
import BirthdayPicker from '@/components/UI/BirthdayPicker.vue';
import LocalizedInput from '@/components/UI/LocalizedInput.vue';
import LocalizedTextarea from '@/components/UI/LocalizedTextarea.vue';
import { ref, computed, watchEffect, inject } from 'vue';
import { useMeta } from 'vue-meta';
import { mdiSend } from '@mdi/js';
import { UserService } from '@/services/user';
import { UserInfo, useInfoStore } from '@/stores/info';
import { useI18n } from 'vue-i18n';
import { useSnackbarStore } from '@/stores/snackbar';
import { user as validations } from '@/utils/validations';
import { VForm } from 'vuetify/components';
import { CurrencyRates } from '@/services/currency';
import { currencyKey } from '@/injection-keys';
import { useDisplay } from 'vuetify';

useMeta({ title: 'pageTitles.profile' });

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { xs, smAndDown } = useDisplay();
const { showMessage } = useSnackbarStore();
const infoStore = useInfoStore();

const { currency } = inject(currencyKey)!;

const currencies = computed(() => {
	const currencyNames = (currency.value?.rates ? Object.keys(currency.value.rates) : [import.meta.env.VITE_APP_DEFAULT_CURRENCY || 'USD']) as CurrencyRates[];
	return currencyNames.map(c => ({ title: t(`currencies.${c}`) + ` (${c})`, value: c }));
});

const info = computed(() => infoStore.info);

const form = ref<VForm>();

const formState = ref<Omit<UserInfo, 'bill' | 'email'> & { avatar: File[] }>({
	username: '',
	firstName: '',
	lastName: '',
	bio: '',
	birthdayDate: new Date(),
	gender: 'unknown',
	locale: 'en-US',
	currency: 'USD',
	avatar: []
});

const genderItems = computed<{ title: string, value: UserInfo['gender'] }[]>(() => ([
	{ title: t('user.gender.male'), value: 'male' },
	{ title: t('user.gender.female'), value: 'female' },
	{ title: t('user.gender.unknown'), value: 'unknown' }
]));

const locales = [
	{ title: 'Русский', value: 'ru-RU' },
	{ title: 'Українська', value: 'uk-UA' },
	{ title: 'English', value: 'en-US' },
];

//fillInfo
watchEffect(() => {
	if (info.value && Object.keys(info.value).length) {
		const { bill, ...userdata } = info.value;
		formState.value = { ...formState.value, ...userdata };
	}
})

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
	if (valid) {
		try {
			const { avatar, ...userdata } = formState.value;
			await UserService.updateInfo(userdata);
			if (avatar.length) {
				await UserService.updateUserAvatar(avatar);
				formState.value.avatar = [];
			}
			showMessage(t('updateProfile_message'));
		} catch (e) {
			showMessage(t(e as string) || e as string);
		}
	}
}
</script>
