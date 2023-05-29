<script setup lang="ts">
import { FormCreate } from '#components';

// import { storeToRefs } from 'pinia';

// const formsStore = useFormsStore();
// const { forms } = storeToRefs(formsStore);

// formsStore.getAll();
const dialogFormVisible = ref(false);
const createForm = ref<typeof FormCreate>();

const { state, send } = useMachine(formsMachine, { devTools: true });
send('FETCH');

function resetForm () {
	createForm.value?.reset();
}
function closeForm () {
	resetForm();
	dialogFormVisible.value = false;
}
function formCreated () {
	send('FETCH');
	closeForm();
}

let isDeleting = false;
const dataLoading = computed(() => !isDeleting && !state.value.matches('success') && !state.value.matches('ready'));

const search = ref('');
const filteredData = computed(() => {
	if (!state.value.context.forms) {
		return [];
	}

	if (!search.value) {
		return state.value.context.forms;
	}

	const s = search.value.toLowerCase();
	return state.value.context.forms.filter(
		form => form.name.toLowerCase().includes(s) || form.description.toLowerCase().includes(s));
});

function handleEdit (row: Form) {
	navigateTo(`forms/${row.id}`);
}
async function handleDelete (row: Form) {
	isDeleting = true;
	const config = useRuntimeConfig();
	const url = `${config.public.apiUrl}/Forms/${row.id}`;

	await fetchWrapper.delete(url);

	send('FETCH');
	isDeleting = false;
}
</script>

<template>
	<div>
		<h3>Forms from secure api end point:</h3>

		<el-table v-loading="dataLoading" :data="filteredData" style="width: 100%">
			<el-table-column label="Name" prop="name" sortable />
			<el-table-column label="Description" prop="description" />
			<el-table-column align="right">
				<template #header>
					<el-input v-model="search" size="small" placeholder="Type to search" />
				</template>
				<template #default="scope">
					<el-button size="small" @click="handleEdit(scope.row)">
						Edit
					</el-button>
					<el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row)">
						<template #reference>
							<el-button size="small" type="danger">
								Delete
							</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>

		<el-button @click="dialogFormVisible = true">
			Create
		</el-button>

		<div v-if="state.matches('failure')" class="text-danger">
			Error loading users: {{ state.context.error }}
			<el-button @click="send('RETRY')">
				Retry
			</el-button>
		</div>

		<el-dialog v-model="dialogFormVisible" title="Create new form" @closed="resetForm">
			<form-create ref="createForm" hide-submit @created="formCreated()" />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeForm">
						Cancel
					</el-button>
					<el-button type="primary" @click="createForm?.submit()">
						Confirm
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
