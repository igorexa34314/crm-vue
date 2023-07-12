<template>
	<div>
		<div class="title">
			<h3 class="text-h4 mt-4 ml-2">{{ t('pageTitles.newRecord') }}</h3>
		</div>

		<app-loader v-if="isLoading" class="mt-10" page />

		<div v-else-if="!categories?.length" class="mt-10 text-center text-h6">
			{{ t('no_categories') + '. ' }}
			<router-link to="/categories">{{ t('create_category') }}</router-link>
		</div>

		<NewRecord v-else v-bind="{ categories, defaultAmount: 100 }" @create-record="create" />
	</div>
</template>

<script setup lang="ts">
import NewRecord from '@/components/record/NewRecord.vue';
import { computed } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useMeta } from 'vue-meta';
import { useI18n } from 'vue-i18n';
import { useInfoStore } from '@/stores/info';
import { updateInfo } from '@/services/user';
import { useSnackbarStore } from '@/stores/snackbar';
import { fetchCategories } from '@/services/category';
import { createRecord, Record } from '@/services/record';
import messages from '@/utils/fbMessages.json';

useMeta({ title: 'pageTitles.newRecord' });

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { showMessage } = useSnackbarStore();
const infoStore = useInfoStore();

const info = computed(() => infoStore.info);

const { state: categories, isLoading } = useAsyncState(fetchCategories, [], {
	onError: (e) => {
		showMessage(messages[e as keyof typeof messages] || t('error_load_categories'))
	}
});

const create = async (formData: Omit<Record, 'date'>) => {
	try {
		await createRecord(formData as Record);

		const { type, amount } = formData;
		const newBill = type === 'income' ?
			info.value!.bill + amount : info.value!.bill - amount;

		await updateInfo({ bill: +newBill.toFixed(2) });
		showMessage(t('createRecord_success'));
	} catch (e) {
		showMessage(messages[e as keyof typeof messages] || e as string);
	}
}
</script>
