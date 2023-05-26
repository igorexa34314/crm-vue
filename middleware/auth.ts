export default defineNuxtRouteMiddleware(async to => {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return navigateTo({ path: '/login', query: { message: 'login' } });
	} else if (['/login', '/register'].includes(to.path)) {
		return navigateTo('/profile');
	}
});
