import { UUID } from 'crypto';

export const formService = {
	getAll: getAllForms,
	get: getForm,
	create: createForm,
	update: updateForm,
	delete: deleteForm,
};

function getBaseUrl (): string {
	const config = useRuntimeConfig();
	return `${config.public.apiUrl}/Forms`;
}

async function getAllForms (): Promise<Form[]> {
	return await fetchWrapper.get(getBaseUrl());
}

async function getForm (id: UUID): Promise<Form> {
	return await fetchWrapper.get(`${getBaseUrl()}/${id}`);
}
async function createForm (form: FormCreate): Promise<Form> {
	return await fetchWrapper.post(getBaseUrl(), form);
}
async function updateForm (form: Form): Promise<Form> {
	return await fetchWrapper.put(`${getBaseUrl()}/${form.id}`, form);
}
async function deleteForm (id: UUID): Promise<void> {
	await fetchWrapper.delete(`${getBaseUrl()}/${id}`);
}
