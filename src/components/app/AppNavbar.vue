<template>
	<v-app-bar :elevation="2" color="orange-lighten-1">
		<template #prepend>
			<v-app-bar-nav-icon color="blue-grey-darken-3" @click.stop="emit('click')" />
		</template>
		<v-app-bar-title class="mt-1 text-blue-grey-darken-3">
			{{ d(date, 'long') }}
		</v-app-bar-title>
		<v-spacer />
		<v-menu>
			<template #activator="{ props }">
				<v-btn color="blue-grey-darken-4" variant="text" v-bind="props" class="mr-7"
					:append-icon="mdiTriangleSmallDown">
					<div v-if="displayName" class="text-capitalize text-subtitle-1 font-weight-bold">{{ displayName }}</div>
					<div v-else class="text-capitalize text-subtitle-1">{{ t('guest') }}</div>
				</v-btn>
			</template>
			<v-list density="comfortable">
				<v-list-item @click="push('/profile')">
					<template #prepend>
						<v-icon :icon="mdiAccountCircleOutline" class="mr-3"></v-icon>
					</template>
					<v-list-item-title>{{ t('pageTitles.profile') }}</v-list-item-title>
				</v-list-item>
				<v-list-item @click="emit('logout')">
					<template #prepend>
						<v-icon :icon="mdiLogout" class="mr-3"></v-icon>
					</template>
					<v-list-item-title>{{ t('logout') }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>
</template>

<script setup lang="ts">
import { mdiTriangleSmallDown, mdiAccountCircleOutline, mdiLogout } from '@mdi/js';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useInfoStore } from '@/stores/info';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const emit = defineEmits<{
	(e: 'logout'): void;
	(e: 'click'): void;
}>();

const { t, d } = useI18n({ inheritLocale: true, useScope: 'global' });
const { push } = useRouter();
const infoStore = useInfoStore();

const displayName = computed(() => infoStore.info?.displayName);
const date = ref(new Date());

let dateInterval: NodeJS.Timer;
onMounted(() => {
	dateInterval = setInterval(() => date.value = new Date(), 1000 * 20);
});
onUnmounted(() => clearInterval(dateInterval));
</script>
