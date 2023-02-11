<template>
	<v-col cols="8" lg="8" md="6" sm="12">
		<v-card color="deep-orange-darken-1" elevation="3" min-height="300">
			<v-card-item>
				<v-card-title class="mx-3 mt-3">{{ $filters.localize('exchange_rate') }}</v-card-title>
			</v-card-item>
			<v-card-text>
				<v-table class="bg-transparent">
					<thead>
						<tr>
							<th class="text-white text-subtitle-1 font-weight-bold">{{ $filters.localize('currency') }}</th>
							<th class="text-white text-subtitle-1 font-weight-bold">{{ $filters.localize('rate') }}</th>
							<th class="text-white text-subtitle-1 font-weight-bold">{{ $filters.localize('date') }}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="cur in currencies" :key="cur" class="text-white text-subtitle-1">
							<td>{{ cur }}</td>
							<td>{{ rates[cur].toFixed(4) }}</td>
							<td>{{ $filters.date(date, 'date') }}</td>
						</tr>
					</tbody>
				</v-table>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps(['rates', 'date']);

const currencies = ref([]);
onMounted(() => {
	currencies.value = Object.keys(props.rates);
})

</script>

<style lang="scss" scoped>

</style>