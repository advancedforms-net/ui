<script setup lang="ts">
import { inspect } from '@xstate/inspect';
import { useDark } from '@vueuse/core';
import { useAuthStore } from '@/stores';

if (process.dev) {
	inspect({
		// options
		// url: 'https://stately.ai/viz?inspect', // (default)
		iframe: false, // open in new window
	});
}

const route = useRoute();
const isDark = useDark();

const authStore = useAuthStore();
</script>

<template>
	<el-container>
		<el-header>
			<el-menu
				:default-active="route.path"
				mode="horizontal"
				:router="true"
				:ellipsis="false"
			>
				<el-menu-item index="/">
					<el-image src="/ui/logo.svg" style="height: 56px;" />
				</el-menu-item>

				<div class="flex-grow" />

				<div class="theme-toggler">
					<el-switch
						v-model="isDark"
						inline-prompt
						:active-icon="ElIconMoon"
						:inactive-icon="ElIconSunny"
						style="--el-switch-on-color: #E6A23C;"
					/>
				</div>

				<nav class="navbar-menu">
					<el-menu-item index="/docs">
						Docs
					</el-menu-item>

					<el-sub-menu v-if="authStore.isLoggedIn" index="userMenu">
						<template #title>
							{{ authStore.userMail }}
						</template>
						<el-menu-item index="/forms">
							Forms
						</el-menu-item>
						<el-menu-item @click="authStore.logout()">
							Logout
						</el-menu-item>
					</el-sub-menu>
					<el-menu-item v-else index="/login">
						Login
					</el-menu-item>
				</nav>
			</el-menu>
		</el-header>

		<el-main class="app-container bg-light">
			<div class="container pt-4 pb-4">
				<NuxtLayout>
					<NuxtPage />
				</NuxtLayout>
			</div>
		</el-main>

		<el-footer class="footer">
			<el-text size="small" type="info" class="copyright-text">
				© {{ new Date().getFullYear() }} AdvancedForms.net
			</el-text>
		</el-footer>
	</el-container>
</template>

<style>
.flex-grow {
	flex-grow: 1;
}

.theme-toggler {
	display: flex;
	align-items: center;
	padding: 8px;
}
.navbar-menu {
	display: flex;
}

.footer {
	display: flex;
}

.copyright-text {
	text-align: center;
	display: block;
	width: 100%;
}
</style>
