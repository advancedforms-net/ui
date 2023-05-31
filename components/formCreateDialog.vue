<script setup lang="ts">
import { FormCreate } from '#components';

const props = defineProps<{ formData?: Form }>();
const emit = defineEmits<{(e: 'created', createdForm: Form): void }>();

const dialogFormVisible = ref(false);
const dialogElement = ref<typeof FormCreate>();

const title = computed(() => props.formData ? 'Edit form' : 'Create new form');

function resetForm () {
	dialogElement.value?.reset();
}
function openForm () {
	dialogFormVisible.value = true;
}
function closeForm () {
	resetForm();
	dialogFormVisible.value = false;
}
function formCreated (createdForm: Form) {
	emit('created', createdForm);
	closeForm();
}

defineExpose({
	visible: dialogFormVisible,
	open: openForm,
	close: closeForm,
});
</script>

<template>
	<div>
		<el-dialog v-model="dialogFormVisible" :title="title" @closed="resetForm">
			<form-create ref="dialogElement" :form-data="props.formData" hide-submit @created="formCreated" />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeForm">
						Cancel
					</el-button>
					<el-button type="primary" @click="dialogElement?.submit()">
						Confirm
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
