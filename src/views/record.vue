<template>
	<div>
		<div class="title">
			<h3 class="text-h5 text-sm-h4 mt-2 mt-sm-4 ml-2 text-title">{{ t('pageTitles.newRecord') }}</h3>
		</div>

		<app-loader v-if="isLoading" class="mt-10" page />

		<div v-else-if="!categories?.length" class="mt-10 text-center text-h6">
			{{ t('no_categories') + '. ' }}
			<router-link to="/categories">{{ t('create_category') }}</router-link>
		</div>

		<NewRecord v-else v-bind="{ categories, defaultAmount: 5 }" @create-record="create" />
	</div>
</template>

<script setup lang="ts">
import NewRecord from '@/components/record/NewRecord.vue';
import { computed } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useMeta } from 'vue-meta';
import { useI18n } from 'vue-i18n';
import { useInfoStore } from '@/stores/info';
import { UserService } from '@/services/user';
import { useSnackbarStore } from '@/stores/snackbar';
import { CategoryService } from '@/services/category';
import { RecordService, RecordForm } from '@/services/record';

useMeta({ title: 'pageTitles.newRecord' });

const { t, te } = useI18n({ inheritLocale: true, useScope: 'global' });
const { showMessage } = useSnackbarStore();
const infoStore = useInfoStore();

const info = computed(() => infoStore.info);

const { state: categories, isLoading } = useAsyncState(CategoryService.fetchCategories, [], {
	onError: (e) => {
		showMessage(te(`firebase.messages.${e}`) ? t(`firebase.messages.${e}`) : t('error_load_categories'))
	}
});

const create = async (formData: RecordForm) => {
	try {
		await RecordService.createRecord(formData);

		const { type, amount } = formData;
		const newBill = type === 'income' ?
			info.value!.bill + amount : info.value!.bill - amount;

		await UserService.updateInfo({ bill: +newBill.toFixed(2) });
		showMessage(t('createRecord_success'));
	} catch (e) {
		console.log(e);
		showMessage(te(`firebase.messages.${e}`) ? t(`firebase.messages.${e}`) : e as string)
	}
}
</script>
