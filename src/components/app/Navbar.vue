<template>
	<v-snackbar v-model="snackbar" timeout="2000">Вы вышли из системы</v-snackbar>
	<v-app-bar :elevation="2" color="orange-lighten-1">
		<template v-slot:prepend>
			<v-app-bar-nav-icon color="blue-grey-darken-3" @click.stop="$emit('toggle')" />
		</template>
		<v-app-bar-title class="mt-1 text-blue-grey-darken-3">{{ formattedDate }}</v-app-bar-title>
		<v-spacer />
		<v-menu>
			<template v-slot:activator="{ props }">
				<v-btn color="blue-grey-darken-4" variant="text" v-bind="props" class="font-weight-bold mr-6"
					append-icon="mdi-triangle-small-down">
					USER NAME
				</v-btn>
			</template>

			<v-list density="comfortable">
				<v-list-item>
					<template v-slot:prepend>
						<v-icon icon="mdi-account-circle-outline" class="mr-3"></v-icon>
					</template>
					<v-list-item-title>Профиль</v-list-item-title>
				</v-list-item>
				<v-list-item @click="logout">
					<template v-slot:prepend>
						<v-icon icon="mdi-logout" class="mr-3"></v-icon>
					</template>
					<v-list-item-title>Выйти</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>
	<!-- <ul class="right hide-on-small-and-down">
						<li>
							<a class="dropdown-trigger black-text" href="#" data-target="dropdown">
								USER NAME
								<i class="material-icons right">arrow_drop_down</i>
							</a>
		
							<ul id='dropdown' class='dropdown-content'>
								<li>
									<a href="#" class="black-text">
										<i class="material-icons">account_circle</i>Профиль
									</a>
								</li>
								<li class="divider" tabindex="-1"></li>
								<li>
									<a href="#" class="black-text">
										<i class="material-icons">assignment_return</i>Выйти
									</a>
								</li>
							</ul>
						</li>
					</ul> -->
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDateFilter } from '@/composables/dateFilter';

const router = useRouter();

const snackbar = ref(false);

const date = ref(new Date());
const formattedDate = computed(() => useDateFilter(date.value, 'datetime'));

let dateInterval = null;
onMounted(() => {
	dateInterval = setInterval(() => date.value = new Date(), 1000);
});
onBeforeUnmount(() => clearInterval(dateInterval));

const logout = () => {
	console.log('Logout');
	snackbar.value = true;
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