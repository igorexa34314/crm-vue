<template>
	<v-col cols="8" lg="8" md="6" sm="12">
		<v-card color="deep-orange-darken-1" elevation="3" min-height="300">
			<v-card-item>
				<v-card-title class="mx-3 mt-3">{{ useLocalizeFilter('exchange_rate') }}</v-card-title>
			</v-card-item>
			<v-card-text>
				<v-table class="bg-transparent">
					<thead>
						<tr>
							<th class="text-white text-subtitle-1 font-weight-bold">{{ useLocalizeFilter('currency') }}</th>
							<th class="text-white text-subtitle-1 font-weight-bold">{{ useLocalizeFilter('rate') }}</th>
							<th class="text-white text-subtitle-1 font-weight-bold">{{ useLocalizeFilter('date') }}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="cur in currencies" :key="cur" class="text-white text-subtitle-1">
							<td>{{ cur }}</td>
							<td>{{ rates[cur].toFixed(4) }}</td>
							<td>{{ useDateFilter(date, 'date') }}</td>
						</tr>
					</tbody>
				</v-table>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script setup lang="ts">
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useDateFilter } from '@/filters/dateFilter';
import { ref } from 'vue';
import type { PropType } from 'vue';
import type { CurrencyRates } from '@/composables/currency';

const props = defineProps({
	rates: {
		type: Object as PropType<CurrencyRates>,
		required: true,
	},
	date: {
		type: Date,
		default: new Date
	}
});

const currencies = ref(Object.keys(props.rates) as Array<keyof CurrencyRates>);
</script>

<style lang="scss" scoped></style>