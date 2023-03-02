import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from '~pages';
import { getCurrentUser } from 'vuefire';

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

router.beforeEach(async (to, from, next) => {
	const currentUser = await getCurrentUser();
	const requireAuth = to.matched.some(record => record.meta.auth);
	if (requireAuth && !currentUser) {
		next({ path: '/login', query: { message: 'login' } });
	} else if (!requireAuth && currentUser) {
		next({ path: '/' });
	} else {
		next();
	}
});

export default router;
