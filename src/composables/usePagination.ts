import { MaybeRef, ref, watchEffect, unref } from 'vue';
import { chunk, size } from 'lodash';
import { useRouter, useRoute } from 'vue-router';

export const usePagination = <T>(initialItems: MaybeRef<T[] | undefined>, perPage = 5) => {
	const { push } = useRouter();
	const { query } = useRoute();

	const page = ref(+(query.page || 1));
	const pageCount = ref(0);
	const items = ref<T[]>();
	const allItems = ref<T[][]>();

	const initPagination = () => {
		allItems.value = chunk(unref(initialItems), perPage);
		pageCount.value = size(allItems.value);
		items.value = allItems.value[page.value - 1] || allItems.value[0];
	};
	const pageChangeHandler = (page: number) => {
		push({ query: { page } });
		items.value = allItems.value?.[page - 1] || allItems.value?.[0];
	};
	watchEffect(() => {
		if (unref(initialItems)?.length) {
			initPagination();
		}
	});
	return {
		items,
		page,
		pageCount,
		pageChangeHandler
	};
};
