import { defineStore } from 'pinia';

export const useFormsStore = defineStore('forms', () => {
	const forms = ref({});

	async function getAll () {
		const config = useRuntimeConfig();
		const baseUrl = `${config.apiUrl}/Forms`;

		forms.value = { loading: true };
		try {
			forms.value = await fetchWrapper.get(baseUrl);
		} catch (error) {
			forms.value = { error };
		}
	}

	return { forms, getAll };
});
