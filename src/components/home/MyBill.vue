<template>
	<v-col cols="4" lg="4" md="6" sm="12">
		<v-card color="light-blue darken-3 pa-4" elevation="3" min-height="300">
			<v-card-title class="text-h5 mb-6">{{ t('currency_account') }}</v-card-title>
			<v-card-text class="text-white text-h5">
				<div v-for="cur in currencies" :key="cur" class="mt-7">
					<i18n-n :value="getCurrency(cur)" :format="{ key: 'currency', currency: cur }" class="mx-2" tag="span"
						scope="global" />
					<v-divider color="white" thickness="2.5" class="bg-white mt-4" />
				</div>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useInfoStore } from '@/stores/info';
import { Currency, CurrencyRates } from '@/api/currency';

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const infoStore = useInfoStore();

const props = defineProps<{
	rates: Currency['rates'];
}>();

const currencies = computed(() => Object.keys(props.rates || {}) as CurrencyRates[]);

const info = computed(() => infoStore.info);

const getCurrency = computed(() => (currency: CurrencyRates) => {
	const base = info.value?.bill ? info.value.bill / props.rates[(import.meta.env.VITE_APP_DEFAULT_CURRENCY || 'USD') as CurrencyRates] : 0;
	return Math.floor(base * props.rates[currency]);
});
</script>

<style scoped>
.v-theme--light .v-divider {
	--v-border-opacity: 1;
}
</style>