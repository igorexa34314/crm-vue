<template>
	<div>
		<div class="d-flex flex-row align-center">
			<h3 class="title text-h4 flex-grow-1 my-2 ">{{ useLocalizeFilter('pageTitles.bill') }}</h3>
			<v-btn color="green-darken-2" @click="refresh(2000)">
				<v-icon :icon="mdiRefresh" />
			</v-btn>
		</div>
		<v-divider color="black" thickness="1.5" class="bg-white mt-1 mb-8" />
		<app-loader v-if="isLoading" color="#1A237E" class="mt-2" page />
		<v-row v-else-if="currency && isReady">
			<UserBill :rates="currency.rates" />
			<UserCurrency :rates="currency.rates" :date="new Date(currency.date)" />
		</v-row>
	</div>
</template>

<script setup lang="ts">
import { mdiRefresh } from '@mdi/js';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import UserBill from '@/components/home/UserBill.vue';
import UserCurrency from '@/components/home/UserCurrency.vue';
import { fetchCurrency } from '@/api/currency';
import { useMeta } from 'vue-meta';
import { useAsyncState } from '@vueuse/core';

useMeta({ title: 'pageTitles.bill' });

const { state: currency, isLoading, isReady, execute: refresh } = useAsyncState(fetchCurrency, null);
</script>

<style lang="scss" scoped>
.v-theme--light .v-table {
	--v-border-opacity: 0.18;
}
</style>