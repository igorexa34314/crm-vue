<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">{{ useLocalizeFilter('pageTitles.profile') }}</h3>
		</div>
		<v-form ref="form" @submit.prevent="submitHandler" class="profile-form mt-8 px-4">
			<v-text-field v-model="formState.name" :rules="user.name" variant="underlined" :label="useLocalizeFilter('name')"
				required />
			<v-select v-model="formState.locale" :items="langItems" :label="useLocalizeFilter('lang')" item-title="title"
				item-value="value" variant="underlined" class="mt-4" />
			<v-btn type="submit" color="teal-darken-2" class="mt-5">
				{{ useLocalizeFilter('update') }}
				<v-icon :icon="mdiSend" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watchEffect } from 'vue';
import { useMeta } from 'vue-meta';
import { mdiSend } from '@mdi/js';
import { updateInfo } from '@/api/userinfo';
import { useInfoStore } from '@/stores/info';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useSnackbarStore } from '@/stores/snackbar';
import { user } from '@/utils/validations';
import { VForm } from 'vuetify/components';
import { Locales } from '@/stores/info';

useMeta({ title: 'pageTitles.profile' });

const { showMessage } = useSnackbarStore();
const infoStore = useInfoStore();

const info = computed(() => infoStore.info);

const form = ref<VForm>();

const formState = reactive({
	name: '',
	locale: '' as Locales,
});

const langItems = [
	{ title: 'Русский', value: 'ru-RU' },
	{ title: 'Українська', value: 'uk-UA' },
	{ title: 'English', value: 'en-US' },
];

const fillInfo = () => {
	if (info.value && Object.keys(info.value).length) {
		formState.locale = info.value.locale;
		formState.name = info.value.name;
	}
}
watchEffect(() => {
	fillInfo();
})

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
	if (valid) {
		try {
			await updateInfo(formState);
			showMessage(useLocalizeFilter('updateProfile_message'));
		} catch (e) {
			showMessage(useLocalizeFilter(e as string) || e as string);
		}
	}
}
</script>

<style lang="scss" scoped></style>