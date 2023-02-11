<template>
	<v-col cols="6" md="6" sm="12">
		<div>
			<div class="subtitle">
				<h4 class="text-h5 mb-7">{{ $filters.localize('create') }}</h4>
			</div>

			<v-form ref="form" v-model="valid" @submit.prevent="submitHandler">
				<v-text-field v-model="title" :rules="validations.title" variant="underlined"
					:label="$filters.localize('title')" required />

				<v-text-field v-model.number="limit" :rules="validations.limit" variant="underlined" type="number"
					:label="$filters.localize('limit')" class="mt-6" required />

				<v-btn color="green-darken-3" type="submit" class="mt-7">
					{{ $filters.localize('create') }}
					<v-icon icon="mdi-send" class="ml-3" />
				</v-btn>
			</v-form>
		</div>
	</v-col>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { useLocalizeFilter } from '@/filters/localizeFilter';

const emit = defineEmits(['created']);
const store = useStore();
const snackbar = getCurrentInstance().appContext.app.config.globalProperties.$snackbar;

const form = ref();
const valid = ref(true);
const title = ref('');
const limit = ref(100);
const validations = {
	title: [
		v => !!v || useLocalizeFilter('message_EnterCategoryName'),
		v => (v && v.length >= 3 && v.length <= 32) || useLocalizeFilter('category_rules'),
	],
	limit: [
		v => !!v || useLocalizeFilter('message_EnterLimit'),
		v => (v && v >= 100) || useLocalizeFilter('limit_rules'),
	],
}

const submitHandler = async () => {
	const { valid } = await form.value.validate();

	if (valid) {
		try {
			const category = await store.dispatch('category/createCategory', {
				title: title.value,
				limit: limit.value,
			});
			form.value.reset();
			limit.value = 100;
			snackbar.showMessage('Категория создана');
			emit('created', category);
		} catch (e) {
			console.error(e);
		}
	}
}
</script>

<style lang="scss" scoped>

</style>