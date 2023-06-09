<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';

const props = defineProps<{ hideSubmit?: boolean, data?: FormCreate }>();
const emit = defineEmits<{(e: 'created', createdForm: Form): void }>();

const isLoading = ref(false);
const form = ref<FormInstance>();
const data = reactive(props.data ?? {
	name: '',
	description: '',
	useCodes: false,
});
const formRules = reactive<FormRules>({
	name: [
		{ required: true, message: 'Please input form name', trigger: 'blur' },
		{ min: 3, message: 'Form name should be longer then 3 characters', trigger: 'blur' },
	],
});

function instanceOfForm (object: any): object is Form {
	return 'id' in object;
}

async function submit () {
	if (!form.value) {
		return;
	}

	isLoading.value = true;
	try {
		await form.value.validate();

		const created = instanceOfForm(data)
			? await formService.update(data.id, data)
			: await formService.create(data);

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
		<el-form-item label="Form name" prop="name">
			<el-input v-model="data.name" />
		</el-form-item>
		<el-form-item label="Description" prop="description">
			<el-input v-model="data.description" autosize type="textarea" />
		</el-form-item>
		<el-popover
			placement="bottom"
			trigger="hover"
			width="300"
		>
			<template #reference>
				<el-checkbox v-model="data.useCodes" label="Use codes" size="large" prop="useCodes" />
			</template>

			<p>Use personal codes to submit responses for the form.</p>
			<p>This can be changed later but affects existing presets on the form.</p>
		</el-popover>

		<el-form-item v-if="!props.hideSubmit">
			<el-button type="primary" @click="submit">
				Create
			</el-button>
		</el-form-item>
	</el-form>
</template>
