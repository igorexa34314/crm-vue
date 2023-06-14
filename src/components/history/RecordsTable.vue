<template>
	<v-table>
		<thead>
			<tr>
				<th>#</th>
				<th v-for="h in tableHeaders" :key="h">{{ t(h) }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(rec, index) in records" :key="rec.id">
				<td>{{ startIndex + (index + 1) }}</td>
				<td>{{ n(cf(rec.amount), 'currency', userCurrency) }}</td>
				<td>{{ d(rec.date, 'short') }}</td>
				<td>{{ rec.category }}</td>
				<td>
					<span :class="rec.type === 'outcome' ? 'bg-red-darken-4' : 'bg-green-darken-2'"
						class="py-2 px-3 text-white text-center">
						{{
							rec.type === 'income' ? t('income').toLowerCase() :
							t('outcome').toLowerCase()
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
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useInfoStore } from '@/stores/info';
import { RecordWithCategory } from '@/views/history.vue';
import { useCurrencyFilter } from '@/composables/useCurrencyFilter';

const props = withDefaults(defineProps<{
	records: RecordWithCategory[],
	startIndex?: number,
}>(), {
	startIndex: 1
});

const { t, d, n } = useI18n({ inheritLocale: true, useScope: 'global' });
const { push } = useRouter();
const { currencyFilter: cf } = useCurrencyFilter();
const { userCurrency } = storeToRefs(useInfoStore());


const tableHeaders = ['amount', 'date', 'category', 'type', 'open'];
</script>

<style scoped></style>