import { ref } from 'vue';
import { chunk, size } from 'lodash';
import { useRouter, useRoute } from 'vue-router';

export const usePagination = () => {
	const router = useRouter();
	const route = useRoute();

	const page = ref(+route.query.page || 1);
	const pageCount = ref(0);
	const items = ref([]);
	const allItems = ref([]);

	const initPagination = (initialItems, perPage = 5) => {
		allItems.value = chunk(initialItems, perPage);
		pageCount.value = size(allItems.value);
		items.value = allItems.value[page.value - 1] || allItems.value[0];
	};
	const pageChangeHandler = page => {
		router.push({ query: { page } });
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