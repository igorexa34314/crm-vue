<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">{{ useLocalizeFilter('pageTitles.newRecord') }}</h3>
		</div>

		<app-loader v-if="loading" class="mt-10 page-loader" />

		<div v-else-if="!categories.length" class="mt-10 text-center text-h6">{{
			useLocalizeFilter('no_categories') + '. '
		}}
			<router-link to="/categories">{{ useLocalizeFilter('create_category') }}</router-link>
		</div>

		<v-form v-else ref="form" v-model="valid" @submit.prevent="submitHandler" class="record-form mt-8 px-4">
			<v-select v-model="currentCategoryId" :items="categories" item-title="title" item-value="id"
				:label="useLocalizeFilter('select_category')" variant="underlined" />

			<v-radio-group class="mt-3" v-model="type">
				<v-radio :label="useLocalizeFilter('income')" value="income" density="comfortable" color="orange-accent-3" />
				<v-radio :label="useLocalizeFilter('outcome')" value="outcome" density="comfortable" color="orange-accent-3" />
			</v-radio-group>

			<v-text-field v-model.number="amount" :rules="validations.amount" type="number" variant="underlined"
				:label="useLocalizeFilter('amount')" class="mt-2" required />

			<v-text-field v-model="description" :rules="validations.description" variant="underlined"
				:label="useLocalizeFilter('description')" class="mt-2" required />

			<v-btn type="submit" color="light-blue-darken-4" class="mt-7">
				{{ useLocalizeFilter('create') }}
				<v-icon icon="mdi-send" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useMeta } from 'vue-meta';
import { useSnackbarStore } from '@/stores/snackbar';

useMeta({ title: 'pageTitles.newRecord' });

const { showMessage} = useSnackbarStore();
const store = useStore();

const form = ref();
const valid = ref(true);
const loading = ref(true);
const categories = ref([]);
const currentCategoryId = ref('');
const amount = ref(1);
const description = ref('');

const info = computed(() => store.state.info.info);

const type = ref('outcome');
const canCreateRecord = computed(() => {
	if (type.value === 'income') {
		return true;
	}
	return info.value.bill >= amount.value;
})

const validations = {
	amount: [
		v => !!v || useLocalizeFilter('message_EnterAmount'),
		v => (v && v >= 1) || useLocalizeFilter('amount_rules'),
	],
	description: [
		v => !!v || useLocalizeFilter('message_EnterDescription'),
	],
}
onMounted(async () => {
	categories.value = await store.dispatch('category/fetchCategories');
	loading.value = false;
	currentCategoryId.value = categories.value[0].id;
});

const submitHandler = async () => {
	const { valid } = await form.value.validate();

	if (canCreateRecord.value) {
		try {
			await store.dispatch('record/createRecord', {
				categoryId: currentCategoryId.value,
				amount: amount.value,
				description: description.value,
				type: type.value,
				date: new Date().toJSON(),
			})
			const newBill = type.value === 'income' ? info.value.bill + amount.value : info.value.bill - amount.value
			await store.dispatch('info/updateInfo', { bill: newBill });
			showMessage(useLocalizeFilter('createRecord_success'));
			form.value.reset();
			amount.value = 1;
		} catch (e) {
			console.error(e)
		}
	}
	else {
		showMessage(useLocalizeFilter('lack_of_amount') + ` (${amount.value - info.value.bill})`);
	}
}
</script>

<style lang="scss" scoped>
.page-loader {
	left: 50%;
	transform: translate(-50%);
}
</style>