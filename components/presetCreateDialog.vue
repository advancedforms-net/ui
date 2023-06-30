<script setup lang="ts">
import { PresetCreate } from '#components';

const props = defineProps<{ form: Form, data?: Preset }>();
const emit = defineEmits<{(e: 'created', createdPreset: Preset): void }>();

const dialogFormVisible = ref(false);
const dialogElement = ref<typeof PresetCreate>();

const title = computed(() => props.data ? 'Edit form' : 'Create new form');

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
function created (createdPreset: Preset) {
	emit('created', createdPreset);
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
			<preset-create ref="dialogElement" :form="props.form" :data="props.data" hide-submit @created="created" />
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
