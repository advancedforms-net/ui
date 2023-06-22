
type Preset = PresetCreate & {
	id: UUID;
	responses: Response[];
}

interface PresetCreate {
	formId: UUID;
	templateId: UUID;
	code: string;
	description: string;
	values: Record<string, string>;
}
