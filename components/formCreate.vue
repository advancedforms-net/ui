<script setup lang="ts">
const formCreate = reactive({
	name: '',
	description: '',
	useCodes: false,
});

const props = defineProps<{ hideSubmit?: boolean }>();

const emit = defineEmits(['submit']);
function onSubmit () {
	emit('submit');
}

function reset () {
	formCreate.name = '';
	formCreate.description = '';
	formCreate.useCodes = false;
}

defineExpose({
	onSubmit,
	reset,
});
</script>

<template>
	<el-form v-loading="false" :model="formCreate" @submit.prevent="onSubmit">
		<el-form-item label="Form name">
			<el-input v-model="formCreate.name" />
		</el-form-item>
		<el-form-item label="Description">
			<el-input v-model="formCreate.description" autosize type="textarea" />
		</el-form-item>
		<el-popover
			placement="right"
			trigger="hover"
			content="this is content, this is content, this is content"
		>
			<template #reference>
				<el-checkbox v-model="formCreate.useCodes" label="Use codes" size="large" />
			</template>
		</el-popover>

		<el-form-item v-if="!props.hideSubmit">
			<el-button type="primary" @click="onSubmit">
				Create
			</el-button>
		</el-form-item>
	</el-form>
</template>
