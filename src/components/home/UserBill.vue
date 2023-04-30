<template>
	<v-col cols="4" lg="4" md="6" sm="12">
		<v-card color="light-blue darken-3 pa-4" elevation="3" min-height="300">
			<v-card-title class="text-h5 mb-6">{{ useLocalizeFilter('currency_account') }}</v-card-title>
			<v-card-text class="text-white text-h5">
				<div v-for="cur in currencies" :key="cur" class="mt-7">
					<span class="mx-2">{{ useCurrencyFilter(getCurrency(cur), cur) }}</span>
					<v-divider color="white" thickness="2.5" class="bg-white mt-4" />
				</div>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script setup lang="ts">
import { useCurrencyFilter } from '@/filters/currencyFilter';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { ref, computed } from 'vue';
import { useInfoStore } from '@/stores/info';
import { Currency } from '@/api/currency';

const infoStore = useInfoStore();

const props = defineProps<{
	rates: Currency['rates'];
}>();

const currencies = ref(Object.keys(props.rates) as Array<keyof Currency['rates']>);

const info = computed(() => infoStore.info);

const base = computed(() => info.value && info.value.bill ? info.value.bill / (props.rates['UAH'] / props.rates['USD']) : null);
const getCurrency = (currency: keyof Currency['rates']) => Math.floor((base.value! | 0) * props.rates[currency]);
</script>

<style lang="scss" scoped>
.v-theme--light .v-divider {
	--v-border-opacity: 1;
}
</style>