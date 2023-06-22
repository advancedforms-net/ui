
interface Response {
	id: UUID;
	presetId: UUID;
	creation: Date;
	values: Record<string, string>;
}
