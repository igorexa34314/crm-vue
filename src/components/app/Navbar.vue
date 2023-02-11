<template>
	<v-app-bar :elevation="2" color="orange-lighten-1">
		<template v-slot:prepend>
			<v-app-bar-nav-icon color="blue-grey-darken-3" @click.stop="$emit('click')" />
		</template>
		<v-app-bar-title class="mt-1 text-blue-grey-darken-3">
			{{ $filters.date(date, 'datetime') }}
		</v-app-bar-title>
		<v-spacer />
		<v-menu>
			<template v-slot:activator="{ props }">
				<v-btn color="blue-grey-darken-4" variant="text" v-bind="props" class="mr-7"
					append-icon="mdi-triangle-small-down">
					<div v-if="username" class="text-capitalize text-subtitle-1 font-weight-bold">{{ username }}</div>
					<div v-else class="text-capitalize text-subtitle-1">{{ $filters.localize('guest') }}</div>
				</v-btn>
			</template>
			<v-list density="comfortable">
				<v-list-item @click="router.push('/profile')">
					<template v-slot:prepend>
						<v-icon icon="mdi-account-circle-outline" class="mr-3"></v-icon>
					</template>
					<v-list-item-title>{{ $filters.localize('pageTitles.profile') }}</v-list-item-title>
				</v-list-item>
				<v-list-item @click="logout">
					<template v-slot:prepend>
						<v-icon icon="mdi-logout" class="mr-3"></v-icon>
					</template>
					<v-list-item-title>{{ $filters.localize('logout') }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const emit = defineEmits(['click']);

const router = useRouter();
const store = useStore();

const username = computed(() => store.state.info.info.name);
const date = ref(new Date());

let dateInterval = null;
onMounted(() => {
	dateInterval = setInterval(() => date.value = new Date(), 1000);
});
onBeforeUnmount(() => clearInterval(dateInterval));

const logout = async () => {
	await store.dispatch('auth/logout');
	router.push({
		path: '/login',
		query: {
			message: 'logout'
		}
	})
}
</script>

<style lang="scss" scoped>

</style>