
type PresetTemplate = PresetTemplateCreate & {
	id: UUID;
}

interface PresetTemplateCreate {
	formId: UUID;
	description: string;
	values: Record<string, string>;
}
