<script setup lang="ts">
import { inspect } from '@xstate/inspect';
import { useAuthStore } from '@/stores';

inspect({
	// options
	// url: 'https://stately.ai/viz?inspect', // (default)
	iframe: false, // open in new window
});

const authStore = useAuthStore();
</script>

<template>
	<div>
		<div class="app-container bg-light">
			<nav v-show="authStore.userToken" class="navbar navbar-expand navbar-dark bg-dark">
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
