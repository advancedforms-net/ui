<script setup lang="ts">
// import { storeToRefs } from 'pinia';

// const formsStore = useFormsStore();
// const { forms } = storeToRefs(formsStore);

// formsStore.getAll();
const dialogFormVisible = ref(false);
const createForm = ref<FormCreate>();

const { state, send } = useMachine(homeMachine, { devTools: true });
send('FETCH');

function closeForm () {
	dialogFormVisible.value = false;
}
function resetForm () {
	createForm.value.reset();
}
</script>

<template>
	<div>
		<h3>Forms from secure api end point:</h3>
		<div v-if="state.matches('success') || state.matches('ready')">
			<ul v-if="state.context.forms.length">
				<li v-for="form in state.context.forms" :key="form.id">
					{{ form.name }}: {{ form.description }}
				</li>
			</ul>
			<div v-else>
				No forms created yet.
			</div>

			<el-button @click="dialogFormVisible = true">
				Create
			</el-button>
		</div>

		<div v-if="state.matches('loading') || state.matches('initial')" class="spinner-border spinner-border-sm" />
		<div v-if="state.matches('failure')" class="text-danger">
			Error loading users: {{ state.context.error }}
			<el-button @click="send('RETRY')">
				Retry
			</el-button>
		</div>

		<el-dialog v-model="dialogFormVisible" title="Create new form" @closed="resetForm">
			<form-create ref="createForm" hide-submit @submit="closeForm" />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeForm">
						Cancel
					</el-button>
					<el-button type="primary" @click="createForm.onSubmit()">
						Confirm
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
