<script setup lang="ts">
import { FormCreateDialog } from '#components';

const dialogElement = ref<typeof FormCreateDialog>();
const showAsTable = ref(true);

const { state, send } = useMachine(formsMachine, { devTools: true });
send('FETCH');

function formCreated () {
	send('FETCH');
}

let isDeleting = false;
const dataLoading = computed(() => isDeleting || (!state.value.matches('success') && !state.value.matches('ready')));

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
	await formService.delete(row.id);
	send('FETCH');
	isDeleting = false;
}
</script>

<template>
	<el-space fill direction="vertical" style="width: 100%;">
		<el-row class="row-bg" justify="space-between">
			<el-col :span="6">
				<h3>Forms from secure api end point:</h3>
			</el-col>
			<el-col :span="6">
				<el-switch
					v-model="showAsTable"
					active-text="Table"
					inactive-text="Cards"
				/>
			</el-col>
		</el-row>

		<el-button @click="dialogElement?.open()">
			Create form
		</el-button>

		<el-table v-if="showAsTable" v-loading="dataLoading" :data="filteredData" table-layout="auto">
			<el-table-column label="Name" prop="name" sortable />
			<el-table-column label="Description" prop="description" />
			<el-table-column label="Use Codes" prop="useCodes">
				<template #default="scope">
					<el-switch
						v-model="scope.row.useCodes"
						inline-prompt
						disabled
						:active-icon="ElIconCheck"
						:inactive-icon="ElIconClose"
					/>
				</template>
			</el-table-column>
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

		<el-row v-else :gutter="20" justify="center">
			<el-col
				v-if="!filteredData.length"
				:span="24"
				:sm="12"
				:md="6"
			>
				<el-empty>
					No forms found.
				</el-empty>
			</el-col>
			<el-col
				v-for="form in filteredData"
				:key="form.id"
				:span="24"
				:sm="12"
				:md="6"
			>
				<el-card>
					<template #header>
						<div class="card-header">
							<span>{{ form.name }}</span>
						</div>
					</template>

					<el-space direction="vertical" style="width: 100%;">
						<el-descriptions :column="1" size="small" :border="true">
							<el-descriptions-item label="Description">
								{{ form.description }}
							</el-descriptions-item>
							<el-descriptions-item label="Use codes">
								<el-switch
									v-model="form.useCodes"
									inline-prompt
									disabled
									:active-icon="ElIconCheck"
									:inactive-icon="ElIconClose"
								/>
							</el-descriptions-item>
						</el-descriptions>
						<el-space>
							<el-button size="small" @click="handleEdit(form)">
								Edit
							</el-button>
							<el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(form)">
								<template #reference>
									<el-button :disabled="dataLoading" size="small" type="danger">
										Delete
									</el-button>
								</template>
							</el-popconfirm>
						</el-space>
					</el-space>
				</el-card>
			</el-col>
		</el-row>

		<div v-if="state.matches('failure')" class="text-danger">
			Error loading users: {{ state.context.error }}
			<el-button @click="send('RETRY')">
				Retry
			</el-button>
		</div>

		<form-create-dialog ref="dialogElement" @created="formCreated()" />
	</el-space>
</template>
