<script setup lang="ts">
import { inspect } from '@xstate/inspect';
import { useDark, useToggle } from '@vueuse/core';
import { useAuthStore } from '@/stores';

inspect({
	// options
	// url: 'https://stately.ai/viz?inspect', // (default)
	iframe: false, // open in new window
});

useHead({
	title: 'AdvancedForms',
	meta: [
		{ name: 'description', content: 'Serverless forms with templates and custom replies.' }
	],
});

const route = useRoute();
const isDark = useDark();

const authStore = useAuthStore();
</script>

<template>
	<div>
		<el-header>
			<el-menu
				:default-active="route.path"
				mode="horizontal"
				:router="true"
				:ellipsis="false"
			>
				<el-menu-item index="/">
					Advanced Forms
				</el-menu-item>

				<div class="flex-grow" />
				<el-switch
					v-model="isDark"
					inline-prompt
					:active-icon="ElIconMoon"
					:inactive-icon="ElIconSunny"
					style="--el-switch-on-color: #E6A23C;"
				/>

				<el-menu-item index="/login">
					Processing Center
				</el-menu-item>
				<el-sub-menu index="2">
					<template #title>
						Workspace
					</template>
					<el-menu-item index="2-1">
						item one
					</el-menu-item>
					<el-menu-item index="2-2">
						item two
					</el-menu-item>
					<el-menu-item index="2-3">
						item three
					</el-menu-item>
					<el-sub-menu index="2-4">
						<template #title>
							item four
						</template>
						<el-menu-item index="2-4-1">
							item one
						</el-menu-item>
						<el-menu-item index="2-4-2">
							item two
						</el-menu-item>
						<el-menu-item index="2-4-3">
							item three
						</el-menu-item>
					</el-sub-menu>
				</el-sub-menu>
			</el-menu>
		</el-header>

		<el-main class="app-container bg-light">
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
		</el-main>

		<el-footer>
			c AdvancedForms.net
		</el-footer>
	</div>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
