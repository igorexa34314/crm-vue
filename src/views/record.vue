<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">{{ useLocalizeFilter('pageTitles.newRecord') }}</h3>
		</div>

		<app-loader v-if="isLoading" class="mt-10" page />

		<div v-else-if="!categories?.length" class="mt-10 text-center text-h6">
			{{ useLocalizeFilter('no_categories') + '. ' }}
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
				<v-icon :icon="mdiSend" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useMeta } from 'vue-meta';
import { mdiSend } from '@mdi/js';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useInfoStore } from '@/stores/info';
import { updateInfo } from '@/api/userinfo';
import { useSnackbarStore } from '@/stores/snackbar';
import { fetchCategories } from '@/api/category';
import { createRecord, RecordType, Record } from '@/api/record';
import { record as validations } from '@/utils/validations';
import { VForm } from 'vuetify/components';
import messages from '@/utils/messages.json';

useMeta({ title: 'pageTitles.newRecord' });

const { showMessage } = useSnackbarStore();
const infoStore = useInfoStore();

const form = ref<VForm>();

const currentCategoryId = ref('');
const formState = reactive({
	amount: 100,
	description: '',
	type: 'outcome' as RecordType,
});

const info = computed(() => infoStore.info);

const canCreateRecord = computed(() => {
	return formState.type === 'income' ? true : info.value!.bill >= formState.amount;
});

const { state: categories, isLoading } = useAsyncState(fetchCategories, [], {
	onError: (e) => {
		// showMessage(messages[e as keyof typeof messages] || 'error_loading_categories')
	},
	onSuccess: (cats) => {
		currentCategoryId.value = cats?.[0].id || '';
	}
});

const submitHandler = async () => {
	const valid = (await form.value?.validate())?.valid;
	if (valid && canCreateRecord.value) {
		try {
			await createRecord({
				categoryId: currentCategoryId.value,
				amount: formState.amount,
				description: formState.description,
				type: formState.type,
			} as Record);
			const newBill = formState.type === 'income' ?
				info.value!.bill + formState.amount : info.value!.bill - formState.amount;
			await updateInfo({ bill: newBill });
			showMessage(useLocalizeFilter('createRecord_success'));
			form.value?.reset();
			formState.amount = 1;
		} catch (e) {
			showMessage(messages[e as keyof typeof messages] || e as string);
		}
	}
	else {
		showMessage(useLocalizeFilter('lack_of_amount') + ` (${formState.amount - info.value!.bill})`);
	}
}
</script>

<style lang="scss" scoped></style>