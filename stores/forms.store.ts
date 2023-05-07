import { defineStore } from 'pinia';

export const useFormsStore = defineStore({
	id: 'forms',
	state: () => ({
		// initialize state from local storage to enable user to stay logged in
		forms: {},
	}),
	actions: {
		async getAll () {
			const config = useRuntimeConfig();
			const baseUrl = `${config.apiUrl}/api/Forms`;

			this.forms = { loading: true };
			try {
				this.forms = await fetchWrapper.get(baseUrl);
			} catch (error) {
				this.forms = { error };
			}
		},
	},
});
