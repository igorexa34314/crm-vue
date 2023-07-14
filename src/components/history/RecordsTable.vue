<template>
	<v-table class="records-table" :density="xs ? 'comfortable' : 'default'">
		<thead>
			<tr>
				<th>#</th>
				<th v-for="h in tableHeaders" :key="h" @click="triggerSort(h as keyof RecordWithCategory)" class="">
					<span>{{ t(h) }}</span>
					<v-icon v-if="sort.prop === h" :icon="sort.type === 'asc' ? mdiMenuUp : mdiMenuDown" size="small"
						class="ml-1" />
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(rec, index) in records" :key="rec.id" @click="push('/detail/' + rec.id)" class="record">
				<td>{{ startIndex + (index + 1) }}</td>
				<td>{{ n(cf(rec.amount), 'currency', userCurrency) }}</td>
				<td>{{ d(rec.date, smAndDown ? 'shortdate' : 'short') }}</td>
				<td class="record-category">{{ rec.category }}</td>
				<td>
					<span :class="rec.type === 'outcome' ? 'bg-red-darken-4' : 'bg-green-darken-2'"
						class="py-2 px-3 text-white text-center">
						<v-icon :icon="rec.type === 'outcome' ? mdiTrendingDown : mdiTrendingUp"
							:class="{ 'mr-2': !smAndDown }" />
						{{ smAndDown ? '' :
							rec.type === 'income' ? t('income').toLowerCase() :
								t('outcome').toLowerCase()
						}}</span>
				</td>
				<td v-if="!smAndDown">
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
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { mdiOpenInNew, mdiTrendingUp, mdiTrendingDown, mdiMenuUp, mdiMenuDown } from '@mdi/js';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useInfoStore } from '@/stores/info';
import { RecordWithCategory } from '@/views/history.vue';
import { useCurrencyFilter } from '@/composables/useCurrencyFilter';
import { useDisplay } from 'vuetify';
import { toRef } from 'vue';

const props = withDefaults(defineProps<{
	records: RecordWithCategory[],
	startIndex?: number,
	sort?: { prop: keyof RecordWithCategory; type: 'asc' | 'desc' }
}>(), {
	startIndex: 1,
	sort: () => ({ prop: 'date', type: 'desc' })
});

const emit = defineEmits<{
	(e: 'update:sort', val: { prop: keyof RecordWithCategory; type: 'asc' | 'desc' }): void;
}>();

const { t, d, n } = useI18n({ inheritLocale: true, useScope: 'global' });
const { push } = useRouter();
const { smAndDown, xs } = useDisplay();
const { currencyFilter: cf } = useCurrencyFilter();
const { userCurrency } = storeToRefs(useInfoStore());

const triggerSort = (prop: keyof RecordWithCategory) => {
	if (Object.keys(props.records[0]).includes(prop)) {
		if (prop === props.sort.prop) {
			const type = props.sort.type === 'asc' ? 'desc' : 'asc';
			emit('update:sort', { prop, type });
		}
		else {
			emit('update:sort', { prop, type: 'desc' });
		}
	}
};
const tableHeaders = computed(() => (['amount', 'date', 'category', 'type', smAndDown.value ? '' : 'open'].filter(Boolean)));
</script>

<style lang="scss" scoped>
.records-table {
	& thead tr th {
		cursor: pointer;
	}
	& tbody tr {
		cursor: pointer;
		&:hover {
			background-color: #E1F5FE;
		}
	}
	& .record {
		&-category {
			max-width: 400px;
			overflow: hidden;
			text-overflow: ellipsis;
			@media(max-width: 1600px) {
				max-width: 380px;
			}
			@media(max-width: 1280px) {
				max-width: 320px;
			}
			@media(max-width: 960px) {
				max-width: 260px;
			}
			@media(max-width: 640px) {
				max-width: 200px;
			}
		}
	}
}
</style>