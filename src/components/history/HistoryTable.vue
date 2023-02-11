<template>
	<v-table>
		<thead>
			<tr>
				<th>{{ '#' }}</th>
				<th>{{ $filters.localize('amount') }}</th>
				<th>{{ $filters.localize('date') }}</th>
				<th>{{ $filters.localize('category') }}</th>
				<th>{{ $filters.localize('type') }}</th>
				<th>{{ $filters.localize('open') }}</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="(rec, index) in records" :key="rec.id">
				<td>{{ index+ 1 }}</td>
				<td>{{ $filters.currency(rec.amount, 'UAH') }}</td>
				<td>{{ $filters.date(rec.date, 'datetime') }}</td>
				<td>{{ rec.category }}</td>
				<td>
					<span :class="rec.type === 'outcome' ? 'bg-red-darken-4' : 'bg-green-darken-2'"
						class="py-2 px-3 text-white text-center">
						{{
							rec.type === 'income' ? $filters.localize('income').toLowerCase() :
								$filters.localize('outcome').toLowerCase()
						}}</span>
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