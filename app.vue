<script setup lang="ts">
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
	<div>
		<div class="app-container bg-light">
			<nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark">
				<div class="navbar-nav">
					<RouterLink to="/" class="nav-item nav-link">
						Home
					</RouterLink>
					<a class="nav-item nav-link" @click="authStore.logout()">Logout</a>
				</div>
			</nav>
			<div class="container pt-4 pb-4">
				<NuxtLayout>
					<NuxtPage />
				</NuxtLayout>
			</div>
		</div>
	</div>
</template>
