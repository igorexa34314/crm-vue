<template>
	<div>
		<div class="d-flex flex-row align-center">
			<h3 class="title text-h4 flex-grow-1 my-2 ">{{ t('pageTitles.bill') }}</h3>
			<v-btn color="green-darken-2" @click="refresh(1500)">
				<v-icon :icon="mdiRefresh" />
			</v-btn>
		</div>
		<v-divider color="black" thickness="1.5" class="bg-white mt-1 mb-8" />
		<app-loader v-if="isLoading" color="#1A237E" class="mt-2" page />
		<v-row v-else-if="currency && isReady">
			<MyBill :rates="currency.rates" />
			<CurrencyRates v-if="currency?.rates" :rates="currency.rates" :date="new Date(currency.date)" />
		</v-row>
	</div>
</template>

<script setup lang="ts">
import MyBill from '@/components/home/MyBill.vue';
import CurrencyRates from '@/components/home/CurrencyRates.vue';
import { inject } from 'vue';
import { useMeta } from 'vue-meta';
import { useI18n } from 'vue-i18n';
import { currencyKey } from '@/injection-keys';
import { mdiRefresh } from '@mdi/js';


useMeta({ title: 'pageTitles.bill' });

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });

const { currency, isLoading, isReady, refresh } = inject(currencyKey)!;
</script>

<style scoped>
.v-theme--light .v-table {
	--v-border-opacity: 0.18;
}
</style>