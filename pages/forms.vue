<script setup lang="ts">
// import { storeToRefs } from 'pinia';

// import { useAuthStore } from '@/stores';
import homeMachine from '@/utils/homeMachine';

// const formsStore = useFormsStore();
// const { forms } = storeToRefs(formsStore);

// formsStore.getAll();
const dialogFormVisible = ref(false);
const formCreate = reactive({
	name: '',
	description: '',
	useCodes: false,
});

const { state, send } = useMachine(homeMachine, { devTools: true });
send('FETCH');
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

		<el-dialog v-model="dialogFormVisible" title="Create new form">
			<el-form v-loading="false" :model="formCreate">
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
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">
						Cancel
					</el-button>
					<el-button type="primary" @click="dialogFormVisible = false">
						Confirm
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
