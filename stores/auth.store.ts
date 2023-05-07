import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		// initialize state from local storage to enable user to stay logged in
		userToken: (process.client) ? localStorage.getItem('userToken') : null,
		returnUrl: null as string | null,
	}),
	actions: {
		auth (token: string) {
			// token is mailed and will be passed by de url
			// update pinia state
			this.userToken = token;

			// store user details and jwt in local storage to keep user logged in between page refreshes
			if (process.client) {
				localStorage.setItem('userToken', token);
			}

			// redirect to previous url or default to home page
			navigateTo(this.returnUrl || '/');
		},
		async login (mail: string) {
			const config = useRuntimeConfig();
			const baseUrl = `${config.apiUrl}/api/Users`;

			// TODO remove the login method, this should be just in the view because this will mail the token
			const token = await fetchWrapper.post(encodeURI(`${baseUrl}/Authenticate?mail=${mail}`));

			this.auth(token);

			// redirect to previous url or default to home page
			navigateTo(this.returnUrl || '/');
		},
		logout () {
			this.userToken = null;
			if (process.client) {
				localStorage.removeItem('userToken');
			}
			navigateTo('/login');
		},
	},
});
