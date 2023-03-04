<template>
	<div>
		<div class="d-flex flex-row align-center">
			<h3 class="title text-h4 flex-grow-1 my-2 ">{{ useLocalizeFilter('pageTitles.bill') }}</h3>
			<v-btn color="green-darken-2" @click="refresh">
				<v-icon icon="mdi-refresh" />
			</v-btn>
		</div>
		<v-divider color="black" thickness="1.5" class="bg-white mt-1 mb-8" />
		<app-loader v-if="loading" color="#1A237E" class="mt-2 page-loader" />
		<v-row v-else>
			<UserBill :rates="currency.rates" />
			<UserCurrency :rates="currency.rates" :date="currency.date" />
		</v-row>
	</div>
</template>

<script setup lang="ts">
import { useLocalizeFilter } from '@/filters/localizeFilter';
import UserBill from '@/components/home/UserBill.vue';
import UserCurrency from '@/components/home/UserCurrency.vue';
import { ref, onMounted } from 'vue';
import { fetchCurrency } from '@/composables/currency';
import { useMeta } from 'vue-meta';

useMeta({ title: 'pageTitles.bill' });

const loading = ref(true);

const currency = ref();

onMounted(async () => {
	currency.value = await fetchCurrency();
	loading.value = false;
});

const refresh = async () => {
	loading.value = true;
	currency.value = await fetchCurrency();
	loading.value = false;
};
</script>

<style lang="scss" scoped>
.v-theme--light .v-table {
	--v-border-opacity: 0.18;
}
.page-loader {
	left: 50%;
	transform: translate(-50%);
}
</style>