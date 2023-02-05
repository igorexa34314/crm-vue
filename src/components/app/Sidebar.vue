<template>
	<v-navigation-drawer v-model="drawer" location="left" width="300">
		<v-list>
			<v-list-item v-for="link in links" :key="link.url" :to="link.url" active-class="active" link
				:exact="link.exact" active-color="light-blue-darken-3" class="px-5">
				<span class="font-weight-bold">{{ link.title }}</span>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	}
});
const drawer = computed({
	get: () => props.modelValue,
	set: val => emit('update:modelValue', val),
});

const links = ref([
	{ title: 'Счет', url: '/', exact: true, },
	{ title: 'История', url: '/history' },
	{ title: 'Планирование', url: '/planning' },
	{ title: 'Новая запись', url: '/record' },
	{ title: 'Категории', url: '/categories' },
]);
</script>

<style lang="scss" scoped>

</style>