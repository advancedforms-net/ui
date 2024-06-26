import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { decodeJwt } from 'jose';

export const useAuthStore = defineStore('auth', () => {
	// initialize state from local storage to enable user to stay logged in
	const userToken = useStorage('userToken', '');
	const userMail = useStorage('userMail', '');
	const returnUrl = ref(null as string | null);

	const isLoggedIn = computed(() => !!userToken.value);

	function auth (token: string) {
		// token is mailed and will be passed by de url
		// update pinia state
		userToken.value = token;

		const claims = decodeJwt(token);
		userMail.value = claims.mail as string;

		// redirect to previous url or default to home page
		navigateTo(returnUrl.value || '/');
	}
	async function login (mail: string) {
		const config = useRuntimeConfig();
		const baseUrl = `${config.public.apiUrl}/Users`;

		// TODO remove the login method, this should be just in the view because this will mail the token
		const params = new URLSearchParams();
		params.set('mail', mail);
		params.set('body', `Login using following url:\n${window.location.toString()}/?token={token}`);
		await fetchWrapper.post(`${baseUrl}/Authenticate?${params.toString()}`);
	}
	function logout () {
		userToken.value = null;
		navigateTo('/login');
	}

	return { userToken, userMail, isLoggedIn, returnUrl, auth, login, logout };
});
