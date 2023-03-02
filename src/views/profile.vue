<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">{{ useLocalizeFilter('pageTitles.profile') }}</h3>
		</div>
		<v-form ref="form" @submit.prevent="submitHandler" class="profile-form mt-8 px-4">
			<v-text-field v-model="formState.name" :rules="user.name" variant="underlined" :label="useLocalizeFilter('name')"
				required />

			<v-select v-model="formState.currentLocale" :items="langItems" :label="useLocalizeFilter('lang')" item-title="title"
				item-value="value" variant="underlined" class="mt-4" />
			<v-btn type="submit" color="teal-darken-2" class="mt-5">
				{{ useLocalizeFilter('update') }}
				<v-icon icon="mdi-send" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, watchEffect } from 'vue';
import { useInfoStore } from '@/stores/info';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useMeta } from 'vue-meta';
import { useSnackbarStore } from '@/stores/snackbar';
import { user } from '@/utils/validations';

useMeta({ title: 'pageTitles.profile' });

const { showMessage } = useSnackbarStore();
const infoStore = useInfoStore();

const info = computed(() => infoStore.info);

const form = ref();

const formState = reactive({
	name: '',
	currentLocale :'',
});

const langItems = [
	{ title: 'Русский', value: 'ru-RU' },
	{ title: 'Українська', value: 'uk-UA' },
	{ title: 'English', value: 'en-US' },
];

const fillInfo = () => {
	if (Object.keys(info.value).length) {
		formState.currentLocale = info.value.locale;
		formState.name = info.value.name;
	}
}
watchEffect( () => {
	fillInfo();
})

const submitHandler = async () => {
	const { valid } = await form.value.validate();

	if (valid) {
		try {
			await infoStore.updateInfo(formState);
			showMessage(useLocalizeFilter('updateProfile_message'));
		} catch (e) {
			console.error(e);
		}
	}
}
</script>

<style lang="scss" scoped></style>