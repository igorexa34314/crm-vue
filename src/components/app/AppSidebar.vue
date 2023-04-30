<template>
	<v-navigation-drawer v-model="drawer" location="left" width="300">
		<v-list>
			<v-list-item v-for="link in links" :key="link.url" :to="link.url" active-class="active" link :exact="link.exact"
				active-color="light-blue-darken-3" class="px-5">
				<span class="font-weight-bold">{{ useLocalizeFilter('menu.' + link.title) }}</span>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLocalizeFilter } from '@/filters/localizeFilter';
import { useVModel } from '@vueuse/core';

type NavLink = { title: string, url: string, exact?: boolean };
const emit = defineEmits<{
	(e: 'update:modelValue', val: boolean): void;
}>();

const props = withDefaults(defineProps<{
	modelValue?: boolean;
}>(), {
	modelValue: false,
});
const drawer = useVModel(props, 'modelValue', emit);

const links = ref<NavLink[]>([
	{ title: 'bill', url: '/', exact: true, },
	{ title: 'history', url: '/history' },
	{ title: 'plan', url: '/planning' },
	{ title: 'newRecord', url: '/record' },
	{ title: 'categories', url: '/categories' },
]);
</script>

<style lang="scss" scoped></style>