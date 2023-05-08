import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { decodeJwt } from 'jose';

export const useAuthStore = defineStore('auth', () => {
	// initialize state from local storage to enable user to stay logged in
	const userToken = useStorage('userToken', '');
	const userMail = useStorage('userMail', '');
	const returnUrl = ref(null as string | null);

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
		const baseUrl = `${config.public.apiUrl}/api/Users`;

		// TODO remove the login method, this should be just in the view because this will mail the token
		const params = new URLSearchParams();
		params.set('mail', mail);
		const token = await fetchWrapper.post(`${baseUrl}/Authenticate?${params.toString()}`);

		auth(token);

		// redirect to previous url or default to home page
		navigateTo(returnUrl.value || '/');
	}
	function logout () {
		userToken.value = null;
		navigateTo('/login');
	}

	return { userToken, userMail, returnUrl, auth, login, logout };
});
