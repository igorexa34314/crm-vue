import { AuthService } from '@/services/auth';
import { NavigationGuardWithThis } from 'vue-router/auto';

export const checkAuth: NavigationGuardWithThis<undefined> = async (to, from, next) => {
	const currentUser = await AuthService.getCurrentUser();

	const requireAuth = to.matched.some(record => record.meta.auth || record.meta.requiresAuth);
	if (requireAuth && !currentUser) {
		return next({ path: '/login', query: { message: 'login' } });
	} else if (!requireAuth && currentUser) {
		return next({ path: '/' });
	} else return next();
};
