<template>
	<v-col cols="4" lg="4" md="6" sm="12">
		<v-card color="light-blue darken-3 pa-4" elevation="3" min-height="300">
			<v-card-title class="text-h5 mb-6">Счет в валюте</v-card-title>
			<v-card-text class="text-white text-h5">
				<div v-for="cur in currencies" :key="cur" class="mt-7">
					<span class="mx-2">{{ $filters.currency(getCurrency(cur), cur) }}</span>
					<v-divider color="white" thickness="2.5" class="bg-white mt-4" />
				</div>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps(['rates']);

const currencies = ref([]);
onMounted(() => {
	currencies.value = Object.keys(props.rates);
})

const info = computed(() => store.state.info.info);
const base = computed(() => info.value.bill / (props.rates['UAH'] / props.rates['USD']));
const getCurrency = currency => Math.floor(base.value * props.rates[currency]);
</script>

<style lang="scss" scoped>
.v-theme--light .v-divider {
	--v-border-opacity: 1;
}
</style>