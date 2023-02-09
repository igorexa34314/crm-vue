<template>
	<v-col cols="8" lg="8" md="6" sm="12">
		<v-card color="deep-orange-darken-1" elevation="3" min-height="300">
			<v-card-item>
				<v-card-title class="mx-3 mt-3">Курс валют</v-card-title>
			</v-card-item>
			<v-card-text>
				<v-table class="bg-transparent">
					<thead>
						<tr>
							<th class="text-white text-subtitle-1 font-weight-bold">Валюта</th>
							<th class="text-white text-subtitle-1 font-weight-bold">Курс</th>
							<th class="text-white text-subtitle-1 font-weight-bold">Дата</th>
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

<script setup>
import { useDateFilter } from '@/filters/dateFilter'
import { ref, onMounted } from 'vue';
const props = defineProps(['rates', 'date']);

const currencies = ref([]);
onMounted(() => {
	currencies.value = Object.keys(props.rates);
})

</script>

<style lang="scss" scoped>

</style>