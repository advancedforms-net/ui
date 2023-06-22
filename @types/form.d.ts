
type Form = FormCreate & {
	id: UUID;
	presets: Preset[];
	presetTemplates: PresetTemplate[];
}

interface FormCreate {
	name: string;
	description: string;
	useCodes: boolean;
}
