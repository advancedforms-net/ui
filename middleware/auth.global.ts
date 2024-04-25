import { useAuthStore } from '@/stores/index';

export default defineNuxtRouteMiddleware((to) => {
	const auth = useAuthStore();

	// if any route has a token then we try to login usign it
	if (to.query.token) {
		return auth.auth(to.query.token);
	}

	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ['/', '/docs', '/login'];
	const authRequired = !publicPages.includes(to.path);

	if (authRequired && !auth.isLoggedIn) {
		auth.returnUrl = to.fullPath;
		return navigateTo('/login');
	}
});
