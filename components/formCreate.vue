<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';

const props = defineProps<{ hideSubmit?: boolean }>();

const isLoading = ref(false);
const form = ref<FormInstance>();
const formData = reactive({
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

const emit = defineEmits(['created']);
async function submit () {
	if (!form.value) {
		return;
	}

	isLoading.value = true;
	try {
		await form.value.validate();

		const config = useRuntimeConfig();
		const baseUrl = `${config.public.apiUrl}/Forms`;
		await fetchWrapper.post(baseUrl, formData);
		emit('created');
	} catch {
		// TODO error handling
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
		:model="formData"
		:rules="formRules"
		@submit.prevent="submit"
	>
		<el-form-item label="Form name" prop="name">
			<el-input v-model="formData.name" />
		</el-form-item>
		<el-form-item label="Description" prop="description">
			<el-input v-model="formData.description" autosize type="textarea" />
		</el-form-item>
		<el-popover
			placement="right"
			trigger="hover"
			content="Use personal codes to submit responses for the form"
		>
			<template #reference>
				<el-checkbox v-model="formData.useCodes" label="Use codes" size="large" prop="useCodes" />
			</template>
		</el-popover>

		<el-form-item v-if="!props.hideSubmit">
			<el-button type="primary" @click="submit">
				Create
			</el-button>
		</el-form-item>
	</el-form>
</template>
