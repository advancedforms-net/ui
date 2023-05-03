<script setup lang="ts">
const route = useRoute()

const form = reactive({
	email: ''
})

const onSubmit = () => {
	console.log('submit!')
}
</script>

<template>
	<div>
		<el-container>
			<el-header>
				<h1>Nuxt Routing set up successfully!</h1>
			</el-header>

			<el-main>
				<el-form :inline="true" :model="form" label-width="120px">
					<el-form-item label="Email">
						<el-input v-model="form.email" placeholder="Email" type="email" required />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">
							Login
						</el-button>
					</el-form-item>
				</el-form>
			</el-main>
			<el-footer>
				<p>Current route: {{ route.path }}</p>

				<a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
			</el-footer>
		</el-container>
	</div>
</template>
