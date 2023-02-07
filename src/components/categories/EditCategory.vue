<template>
	<v-col cols="6" md="6" sm="12">
		<div>
			<div class="subtitle">
				<h4 class="text-h5 mb-7">Редактировать</h4>
			</div>
			<v-form ref="form" v-model="valid" @submit.prevent="submitHandler">
				<v-select v-model="currentCategoryId" :items="categories" item-title="title" item-value="id"
					label="Выберите категорию" variant="underlined" />

				<v-text-field v-model="title" :rules="validations.title" variant="underlined" label="Название" class="mt-6"
					required />

				<v-text-field v-model="limit" :rules="validations.limit" variant="underlined" type="number" label="Лимит"
					class="mt-6" required />

				<v-btn color="light-green-darken-4" type="submit" class="mt-7">
					Обновить
					<v-icon icon="mdi-send" class="ml-3" />
				</v-btn>
			</v-form>
		</div>
	</v-col>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const snackbar = getCurrentInstance().appContext.app.config.globalProperties.$snackbar;

const props = defineProps({
	categories: {
		type: Array,
		required: true,
	}
})
const emit = defineEmits(['updated']);

const currentCategoryId = ref(props.categories[0].id);

const form = ref();
const valid = ref(true);
const title = ref(props.categories[0].title);
const limit = ref(props.categories[0].limit);
const validations = {
	title: [
		v => !!v || 'Введите имя категории',
		v => (v && v.length >= 3 && v.length <= 32) || 'Имя категории должно быть в пределах от 3 до 20 символов',
	],
	limit: [
		v => !!v || 'Введите лимит',
		v => (v && v >= 100) || 'Лимит не может быть меньше 100',
	],
}

watch(currentCategoryId, catId => {
	const cat = props.categories.find(c => c.id === catId)
	title.value = cat.title;
	limit.value = cat.limit;
})

const submitHandler = async () => {
	const { valid } = await form.value.validate();

	if (valid) {
		try {
			const categoryData = {
				id: currentCategoryId.value,
				title: title.value,
				limit: limit.value,
			};
			await store.dispatch('category/updateCategory', categoryData);
			snackbar.showMessage('Категория успешно обновлена');
			emit('updated', categoryData);
		} catch (e) { }
	}
}
</script>

<style lang="scss" scoped>

</style>