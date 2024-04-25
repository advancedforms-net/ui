<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { useAuthStore } from '@/stores';

const loading = ref(false);
const form = reactive({
	email: '',
});

async function onSubmit () {
	const authStore = useAuthStore();
	const { email } = form;

	loading.value = true;

	try {
		await authStore.login(email);

		ElMessageBox.alert('<p>An email containing your login information has been sent to the provided email address.</p><br/><p>Please check your inbox (and spam folder, just in case) to access your account.</p>', 'Login send to mail', {
			confirmButtonText: 'OK',
			dangerouslyUseHTMLString: true,
		});
	} catch (e) {
		ElMessage.error('Something went wrong with sending login mail.');
		console.log(e);
	}

	loading.value = false;
}

const authStore = useAuthStore();
if (authStore.isLoggedIn) {
		navigateTo('/');
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
