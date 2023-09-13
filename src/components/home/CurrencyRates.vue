<template>
	<v-card color="card-1" elevation="3" :min-height="smAndDown ? 'auto' : '300'">
		<v-card-item>
			<v-card-title class="mx-3 mt-3 text-h6 text-sm-h5">{{ t('exchange_rate') }}</v-card-title>
		</v-card-item>
		<v-card-text>
			<v-table class="bg-transparent" :density="xs ? 'comfortable' : 'default'">
				<thead>
					<tr>
						<th class="text-title text-subtitle-1 font-weight-bold">{{ t('currency') }}</th>
						<th class="text-title text-subtitle-1 font-weight-bold">{{ t('rate') }}</th>
						<th class="text-title text-subtitle-1 font-weight-bold">{{ t('date') }}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="cur in currencies" :key="cur" class="text-primary text-subtitle-1">
						<td>{{ cur }}</td>
						<td>{{ `${rates[cur].toFixed(4)} ${DEFAULT_CURRENCY}` }}</td>
						<td>{{ d(date, xs ? 'shortdate' : 'short') }}</td>
					</tr>
				</tbody>
			</v-table>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { Currency, CurrencyRates } from '@/services/currency';
import { useDisplay } from 'vuetify';
import { VTable } from 'vuetify/components';
// import { storeToRefs } from 'pinia';
// import { useInfoStore } from '@/stores/info';
import { DEFAULT_CURRENCY } from '@/globals';

const props = withDefaults(
	defineProps<{
		rates: Currency['rates'];
		date?: Currency['date'];
	}>(),
	{
		date: () => new Date(),
	}
);

const { xs, smAndDown } = useDisplay();
const { t, d } = useI18n();
// const { getUserCurrency: userCurrency } = storeToRefs(useInfoStore());

const currencies = computed(
	() => Object.keys(props.rates || {}).filter(cur => cur !== DEFAULT_CURRENCY) as CurrencyRates[]
);
</script>
