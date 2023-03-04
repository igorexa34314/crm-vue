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

		<v-form v-else ref="form" @submit.prevent="submitHandler" class="record-form mt-8 px-4">
			<v-select v-model="currentCategoryId" :items="categories" item-title="title" item-value="id"
				:label="useLocalizeFilter('select_category')" variant="underlined" />

			<v-radio-group class="mt-3" v-model="formState.type">
				<v-radio :label="useLocalizeFilter('income')" value="income" density="comfortable" color="orange-accent-3" />
				<v-radio :label="useLocalizeFilter('outcome')" value="outcome" density="comfortable" color="orange-accent-3" />
			</v-radio-group>

			<v-text-field v-model.number="formState.amount" :rules="validations.amount" type="number" variant="underlined"
				:label="useLocalizeFilter('amount')" class="mt-2" required />

			<v-text-field v-model="formState.description" :rules="validations.description" variant="underlined"
				:label="useLocalizeFilter('description')" class="mt-2" required />

			<v-btn type="submit" color="light-blue-darken-4" class="mt-7">
				{{ useLocalizeFilter('create') }}
				<v-icon icon="mdi-send" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useMeta } from 'vue-meta';
import { useInfoStore } from '@/stores/info';
import { useSnackbarStore } from '@/stores/snackbar';
import { useCategory } from '@/composables/category';
import { useRecord } from '@/composables/record';
import type { Category } from '@/composables/category';
import type { RecordType } from '@/composables/record';
import { record as validations } from '@/utils/validations';

useMeta({ title: 'pageTitles.newRecord' });

const { fetchCategories } = useCategory();
const { createRecord } = useRecord();
const { showMessage } = useSnackbarStore();
const infoStore = useInfoStore();

const form = ref();
const loading = ref(true);
const categories = ref<Category[]>([]);

const currentCategoryId = ref<string>('');
const formState = reactive({
	amount: 1,
	description: '',
	type: 'outcome' as RecordType,
});

const info = computed(() => infoStore.info);

const canCreateRecord = computed(() => {
	if (formState.type === 'income') {
		return true;
	}
	return info.value!.bill >= formState.amount;
})

onMounted(async () => {
	categories.value = await fetchCategories();
	loading.value = false;
	currentCategoryId.value = categories.value[0].id || '';
});

const submitHandler = async () => {
	const { valid } = await form.value.validate();

	if (valid && canCreateRecord.value) {
		try {
			await createRecord({
				categoryId: currentCategoryId.value,
				amount: formState.amount,
				description: formState.description,
				type: formState.type,
				date: new Date(),
			})
			const newBill = formState.type === 'income' ?
				info.value!.bill + formState.amount : info.value!.bill - formState.amount;
			await infoStore.updateInfo({ bill: newBill });
			showMessage(useLocalizeFilter('createRecord_success'));
			form.value.reset();
			formState.amount = 1;
		} catch (e) {
			console.error(e)
		}
	}
	else {
		showMessage(useLocalizeFilter('lack_of_amount') + ` (${formState.amount - info.value!.bill})`);
	}
}
</script>

<style lang="scss" scoped>
.page-loader {
	left: 50%;
	transform: translate(-50%);
}
</style>