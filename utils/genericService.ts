import { UUID } from 'crypto';

export class GenericService<ReturnType extends object, CreateType extends object> {
	path: string;
	constructor (path: string) {
		this.path = path;
	}

	getBaseUrl (): string {
		const config = useRuntimeConfig();
		return `${config.public.apiUrl}/${this.path}`;
	}

	public async getAll (): Promise<ReturnType[]> {
		return await fetchWrapper.get(this.getBaseUrl());
	}

	async get (id: UUID): Promise<Form> {
		return await fetchWrapper.get(`${this.getBaseUrl()}/${id}`);
	}

	async create (data: CreateType): Promise<ReturnType> {
		return await fetchWrapper.post(this.getBaseUrl(), data);
	}

	async update (id: UUID, data: ReturnType): Promise<ReturnType> {
		return await fetchWrapper.put(`${this.getBaseUrl()}/${id}`, data);
	}

	async delete (id: UUID): Promise<void> {
		await fetchWrapper.delete(`${this.getBaseUrl()}/${id}`);
	}
}
