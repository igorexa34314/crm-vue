<template>
	<v-table>
		<thead>
			<tr>
				<th>#</th>
				<th>Сумма</th>
				<th>Дата</th>
				<th>Категория</th>
				<th>Тип</th>
				<th>Открыть</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="(rec, index) in records" :key="rec.id">
				<td>{{ index+ 1 }}</td>
				<td>{{ useCurrencyFilter(rec.amount, 'UAH') }}</td>
				<td>{{ useDateFilter(rec.date, 'datetime') }}</td>
				<td>{{ rec.category }}</td>
				<td>
					<span :class="rec.type === 'outcome' ? 'bg-red-darken-4' : 'bg-green-darken-2'"
						class="py-2 px-3 text-white text-center">
						{{ rec.type === 'income' ? 'доход' : 'расход' }}</span>
				</td>
				<td>
					<v-tooltip :activator="`#rec-${rec.id}`" text="Посмотреть запись" location="bottom"
						content-class="bg-teal-lighten-2 font-weight-medium">
						<template v-slot:activator="{ attrs }">
							<v-btn :id="`rec-${rec.id}`" color="teal-darken-1" @click="router.push('/detail/' + rec.id)">
								<v-icon icon="mdi-open-in-new" v-bind="attrs" />
							</v-btn>
						</template>
					</v-tooltip>
				</td>
			</tr>
		</tbody>
	</v-table>
</template>

<script setup>
import { useCurrencyFilter } from '@/filters/currencyFilter';
import { useDateFilter } from '@/filters/dateFilter';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
	records: {
		required: true,
		type: Array,
	}
});
</script>

<style lang="scss" scoped>

</style>