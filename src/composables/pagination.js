import { ref } from 'vue';
import { chunk, size } from 'lodash';

export const usePagination = () => {
	const page = ref(1);
	const pageCount = ref(0);
	const items = ref([]);
	const allItems = ref([]);

	const initPagination = (initialItems, perPage = 5) => {
		allItems.value = chunk(initialItems, perPage);
		pageCount.value = size(allItems.value);
		items.value = allItems.value[page.value - 1] || allItems.value[0];
	};
	const pageChangeHandler = page => {
		items.value = allItems.value[page - 1] || allItems.value[0];
	};

	return {
		items,
		page,
		pageCount,
		initPagination,
		pageChangeHandler
	};
};
