<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">{{ $filters.localize('pageTitles.profile') }}</h3>
		</div>
		<v-form ref="form" v-model="valid" @submit.prevent="submitHandler" class="profile-form mt-8 px-4">
			<v-text-field v-model="name" :rules="validations.name" variant="underlined" :label="$filters.localize('name')"
				required />

			<v-select v-model="currentLocale" :items="langItems" :label="$filters.localize('lang')" item-title="title"
				item-value="value" variant="underlined" class="mt-4" />
			<v-btn type="submit" color="teal-darken-2" class="mt-5">
				{{ $filters.localize('update') }}
				<v-icon icon="mdi-send" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance, watch } from 'vue';
import { useStore } from 'vuex';
import { useLocalizeFilter } from '@/filters/localizeFilter';

useMeta({ title: 'pageTitles.profile' });

const store = useStore();
const snackbar = getCurrentInstance().appContext.app.config.globalProperties.$snackbar;

const info = computed(() => store.state.info.info);

const form = ref();
const valid = ref(true);
const name = ref('');

const langItems = [
	{ title: 'Русский', value: 'ru-RU' },
	{ title: 'Українська', value: 'uk-UA' },
	{ title: 'English', value: 'en-US' },
];

const currentLocale = ref('');

const fillInfo = () => {
	if (Object.keys(info.value).length) {
		currentLocale.value = info.value.locale;
		name.value = info.value.name;
	}
}
watch(info, () => {
	fillInfo();
})
onMounted(() => {
	fillInfo();
})

const validations = {
	name: [
		v => !!v || useLocalizeFilter('message_EnterName'),
		v => (v && v.length >= 3 && v.length <= 32) || useLocalizeFilter('name_rules'),
	],
};

const submitHandler = async () => {
	const { valid } = await form.value.validate();

	if (valid) {
		try {
			await store.dispatch('info/updateInfo', { name: name.value, locale: currentLocale.value });
			snackbar.showMessage(useLocalizeFilter('updateProfile_message'));
		} catch (e) {
			console.error(e);
		}
	}
}
</script>

<style lang="scss" scoped>

</style>