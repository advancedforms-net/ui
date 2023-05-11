import { defineStore } from 'pinia';

type NewForm = {
	name: string;
	description: string;
	useCodes: boolean;
};

export const useFormsStore = defineStore('forms', () => {
	const forms = ref({});

	const config = useRuntimeConfig();
	const baseUrl = `${config.apiUrl}/Forms`;

	async function getAll () {
		forms.value = { loading: true };
		try {
			forms.value = await fetchWrapper.get(baseUrl);
		} catch (error) {
			forms.value = { error };
		}
	}

	async function create (formData: NewForm) {
		forms.value = { loading: true };
		try {
			const newForm = await fetchWrapper.post(baseUrl, formData);
			forms.value.push(newForm);
		} catch (error) {
			forms.value = { error };
		}
	}

	return { forms, getAll, create };
});
