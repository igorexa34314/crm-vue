<template>
	<v-snackbar v-model="sbProps.show" :color="sbProps.color" :timeout="sbProps.timeout" location="top" offset="-100"
		variant="elevated" elevation="3" transition="slide-y-transition">
		<p class="px-2 font-weight-medium">{{ sbProps.text }}</p>

		<template v-slot:actions>
			<v-btn variant="text" color="white" @click="sbProps.show = false">
				<v-icon icon="mdi-close" />
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

store.subscribe((mutation, state) => {
	if (mutation.type === "snackbar/showMessage") {
		sbProps.text = state.snackbar.text;
		sbProps.color = state.snackbar.color;
		sbProps.timeout = state.snackbar.timeout;
		sbProps.show = true;
	}
});

const sbProps = reactive({
	show: false,
	color: '',
	text: '',
	timeout: 0,
});
</script>

<style lang="scss" scoped>

</style>