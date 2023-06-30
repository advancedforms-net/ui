<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';

const props = defineProps<{ form: Form, hideSubmit?: boolean, data?: PresetCreate }>();
const emit = defineEmits<{(e: 'created', createdPreset: Preset): void }>();

const isLoading = ref(false);
const form = ref<FormInstance>();
const data = reactive(props.data ?? {
	formId: props.form.id,
	templateId: null,
	description: '',
	code: '',
	values: {},
});
const formRules = reactive<FormRules>({
	description: [
		{ required: true, message: 'Please input description', trigger: 'blur' },
		{ min: 3, message: 'Description should be longer then 3 characters', trigger: 'blur' },
	],
	code: [
		{ required: props.form.useCodes, message: 'Please input a code', trigger: 'blur' },
		{ min: 3, message: 'Code should be longer then 3 characters', trigger: 'blur' },
	],
	// TODO add template validation
});

function instanceOfPreset (object: any): object is Preset {
	return 'id' in object;
}

async function submit () {
	if (!form.value) {
		return;
	}

	isLoading.value = true;
	try {
		await form.value.validate();

		const created = instanceOfPreset(data)
			? await presetService.update(data.id, data)
			: await presetService.create(data);

		ElMessage.success('Form saved.');
		emit('created', created);
	} catch {
		ElMessage.error('Oops, something went wrong during the save.');
	}

	isLoading.value = false;
}

function reset () {
	form.value?.resetFields();
}

defineExpose({
	submit,
	reset,
});
</script>

<template>
	<el-form
		ref="form"
		v-loading="isLoading"
		status-icon
		require-asterisk-position="right"
		:model="data"
		:rules="formRules"
		@submit.prevent="submit"
	>
		<el-form-item label="Description" prop="description">
			<el-input v-model="data.description" />
		</el-form-item>
		<el-form-item v-if="props.form.useCodes" label="Code" prop="code">
			<el-input v-model="data.code" />
		</el-form-item>

		<!-- TODO template selector -->
		<!-- TODO value editor -->

		<el-form-item v-if="!props.hideSubmit">
			<el-button type="primary" @click="submit">
				Create
			</el-button>
		</el-form-item>
	</el-form>
</template>
