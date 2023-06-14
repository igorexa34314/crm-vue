<template>
	<v-col cols="8" lg="8" md="6" sm="12">
		<v-card color="deep-orange-darken-1" elevation="3" min-height="300">
			<v-card-item>
				<v-card-title class="mx-3 mt-3">{{ t('exchange_rate') }}</v-card-title>
			</v-card-item>
			<v-card-text>
				<v-table class="bg-transparent">
					<thead>
						<tr>
							<th class="text-white text-subtitle-1 font-weight-bold">{{ t('currency') }}</th>
							<th class="text-white text-subtitle-1 font-weight-bold">{{ t('rate') }}</th>
							<th class="text-white text-subtitle-1 font-weight-bold">{{ t('date') }}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="cur in currencies" :key="cur" class="text-white text-subtitle-1">
							<td>{{ cur }}</td>
							<td>{{ rates[cur].toFixed(4) }}</td>
							<td>{{ d(date, 'short') }}</td>
						</tr>
					</tbody>
				</v-table>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script setup lang="ts">
import { Currency, CurrencyRates } from '@/api/currency';

const props = withDefaults(defineProps<{
	rates: Currency['rates'],
	date?: Currency['date'],
}>(), {
	date: () => (new Date()),
});

const { t, d } = useI18n({ inheritLocale: true, useScope: 'global' });
const currencies = computed(() => Object.keys(props.rates || {}) as CurrencyRates[]);
</script>

<style lang="scss" scoped></style>