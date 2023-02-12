<template>
	<v-layout class="app bg-grey-darken-2">
		<router-view />
	</v-layout>
</template>

<script setup>
import { onMounted, computed, watch, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import messages from '@/utils/messages.json';

const store = useStore();
const snackbar = getCurrentInstance().appContext.app.config.globalProperties.$snackbar;

if (!store.state.info.info.locale) {
	store.commit('info/setLocale');
}

const error = computed(() => store.state.error);
watch(error, fbError => {
	snackbar.showMessage(messages[fbError.code] || useLocalizeFilter('error_message'), 'red-darken-3', 3000);
});

</script>

<style lang="scss" scoped>
.app {
	min-height: 100vh;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>