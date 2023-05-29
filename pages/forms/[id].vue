<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const formId = route.params.id;
const url = `${config.public.apiUrl}/Forms/${formId}`;

const form = reactive<Form>(await fetchWrapper.get(url));

function goBack () {
	const router = useRouter();
	router.back();
}
</script>

<template>
	<div>
		<el-page-header @back="goBack()">
			<template #content>
				<el-row :gutter="10">
					<el-col :span="2">
						<el-text size="large">
							{{ form.name }}
						</el-text>
					</el-col>
					<el-col :span="4">
						<el-text
							size="small"
							type="info"
							style="color: var(--el-text-color-regular)"
						>
							{{ form.id }}
						</el-text>
					</el-col>
				</el-row>
			</template>
			<template #extra>
				<div class="flex items-center">
					<el-button>Print</el-button>
					<el-button type="primary" class="ml-2">
						Edit
					</el-button>
				</div>
			</template>
			<p>{{ form.description }}</p>
		</el-page-header>

		<el-empty description="No templates" />
		<el-empty description="No responses" />
	</div>
</template>
