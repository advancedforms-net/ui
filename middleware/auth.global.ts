import { useAuthStore } from '@/stores/index';

export default defineNuxtRouteMiddleware((to) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ['/login'];
	const authRequired = !publicPages.includes(to.path);
	const auth = useAuthStore();

	if (authRequired && !auth.userToken) {
		auth.returnUrl = to.fullPath;
		return navigateTo('/login');
	}
});
