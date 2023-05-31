
interface Form {
	id: UUID;
	name: string;
	description: string;
	useCodes: boolean;
}

interface FormCreate {
	name: string;
	description: string;
	useCodes: boolean;
}
