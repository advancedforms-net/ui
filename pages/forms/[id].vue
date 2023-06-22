<script setup lang="ts">
import { UUID } from 'crypto';
import { FormCreateDialog } from '#components';

const route = useRoute();
const formId = route.params.id as UUID;

const form = ref(await formService.get(formId)); // TODO error handling

const dialogElement = ref<typeof FormCreateDialog>();

function goBack () {
	const router = useRouter();
	router.back();
}
function formUpdated (updatedForm: Form) {
	form.value = updatedForm;
}
</script>

<template>
	<el-space fill direction="vertical" style="width: 100%;">
		<el-page-header @back="goBack()">
			<template #content>
				<div>
					<el-text size="large">
						{{ form.name }}
					</el-text>
					<el-divider direction="vertical" border-style="none" />
					<el-text
						size="small"
						type="info"
						style="color: var(--el-text-color-regular)"
					>
						{{ form.id }}
					</el-text>
				</div>
			</template>
			<template #extra>
				<div>
					<el-button @click="ElMessageBox.alert('TODO')">
						Export
					</el-button>
					<el-button type="primary" @click="dialogElement?.open()">
						Edit
					</el-button>
				</div>
			</template>

			<el-descriptions :column="2" size="small" :border="true">
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
		</el-page-header>

		<el-table v-loading="false" :data="form.presetTemplates" table-layout="auto" empty-text="No templates">
			<el-table-column label="Templates" prop="description" sortable />
			<!-- Values -->
			<el-table-column align="right">
				<template #header>
					<el-tooltip
						content="Templates can be used to share values over multiple presets."
						placement="left-start"
					>
						<el-icon>
							<ElIconQuestionFilled />
						</el-icon>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>

		<el-button @click="ElMessageBox.alert('TODO')">
			Add template
		</el-button>
		<el-button @click="ElMessageBox.alert('TODO')">
			Add preset
		</el-button>

		<el-table v-loading="false" :data="form.presets" table-layout="auto">
			<el-table-column label="presets" prop="description" sortable />
			<el-table-column v-if="form.useCodes" label="code" prop="code" sortable />
			<el-table-column align="right">
				<template #header>
					<el-tooltip
						content="Presets are where the response get registered to. This is where the code for a response is defined and where you can overide template values. There should always be a preset even if no codes are used. In that case there will only be one default preset without code."
						placement="left-start"
					>
						<el-icon>
							<ElIconQuestionFilled />
						</el-icon>
					</el-tooltip>
				</template>
			</el-table-column>
			<template #empty>
				<el-empty description="No presets">
					<el-space direction="vertical">
						<el-text>Create your first preset to start collecting responses.</el-text>
						<el-button type="primary" @click="ElMessageBox.alert('TODO')">
							Add preset
						</el-button>
					</el-space>
				</el-empty>
			</template>
		</el-table>

		<form-create-dialog ref="dialogElement" :data="form" @created="formUpdated" />
	</el-space>
</template>
