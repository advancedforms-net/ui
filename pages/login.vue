<script setup lang="ts">
import { useAuthStore } from '@/stores';

const loading = ref(false);
const form = reactive({
	email: '',
});

async function onSubmit () {
	const authStore = useAuthStore();
	const { email } = form;

	loading.value = true;

	await authStore.login(email);
	// TODO error handling
	// .catch(error => setErrors({ apiError: error }));

	loading.value = false;
}
</script>

<template>
	<div>
		<el-container>
			<el-header>
				<h1>Login to create and manage your forms!</h1>
			</el-header>

			<el-main>
				<el-form v-loading="loading" :inline="true" :model="form" @submit.prevent="onSubmit">
					<el-form-item label="Email">
						<el-input v-model="form.email" placeholder="Email" type="email" autocomplete="on" required />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">
							Login
						</el-button>
					</el-form-item>
				</el-form>
			</el-main>
		</el-container>
	</div>
</template>

<style scoped>
.el-container {
	display: flex;
}

.el-container > * {
	text-align: center;
	display: block;
	width: 100%;
}
</style>
