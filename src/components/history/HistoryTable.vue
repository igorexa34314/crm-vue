<template>
	<v-table>
		<thead>
			<tr>
				<th>#</th>
				<th v-for="h in tableCaptions" :key="h">{{ useLocalizeFilter(h) }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(rec, index) in records" :key="rec.id">
				<td>{{ index + 1 }}</td>
				<td>{{ useCurrencyFilter(rec.amount, 'UAH') }}</td>
				<td>{{ useDateFilter(rec.date, 'datetime') }}</td>
				<td>{{ rec.category }}</td>
				<td>
					<span :class="rec.type === 'outcome' ? 'bg-red-darken-4' : 'bg-green-darken-2'"
						class="py-2 px-3 text-white text-center">
						{{
							rec.type === 'income' ? useLocalizeFilter('income').toLowerCase() :
							useLocalizeFilter('outcome').toLowerCase()
						}}</span>
				</td>
				<td>
					<v-tooltip :activator="`#rec-${rec.id}`" text="Посмотреть запись" location="bottom"
						content-class="bg-teal-lighten-2 font-weight-medium">
						<template #activator="{ props }">
							<v-btn :id="`rec-${rec.id}`" color="teal-darken-1" @click="push('/detail/' + rec.id)">
								<v-icon v-bind="props" :icon="mdiOpenInNew" />
							</v-btn>
						</template>
					</v-tooltip>
				</td>
			</tr>
		</tbody>
	</v-table>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { mdiOpenInNew } from '@mdi/js';
import { useDateFilter } from '@/filters/dateFilter';
import { useCurrencyFilter } from '@/filters/currencyFilter';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { RecordWithCategory } from '@/views/history.vue';

const { push } = useRouter();

const props = defineProps<{
	records: RecordWithCategory[]
}>();
const tableCaptions = ['amount', 'date', 'category', 'type', 'open'];
</script>

<style lang="scss" scoped></style>