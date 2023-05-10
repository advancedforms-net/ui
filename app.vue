<script setup lang="ts">
import { inspect } from '@xstate/inspect';
import { useAuthStore } from '@/stores';

inspect({
	// options
	// url: 'https://stately.ai/viz?inspect', // (default)
	iframe: false, // open in new window
});

const activeIndex = ref('1');

const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}

const authStore = useAuthStore();
</script>

<template>
	<el-header>
		<el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
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
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
