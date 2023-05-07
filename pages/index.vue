<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAuthStore, useFormsStore } from '@/stores';

const authStore = useAuthStore();
const { userToken } = storeToRefs(authStore);

const formsStore = useFormsStore();
const { forms } = storeToRefs(formsStore);

formsStore.getAll();
</script>

<template>
	<div>
		<h1>Hi {{ userToken }}!</h1>
		<p>You're logged in with Vue 3 + Pinia & JWT!!</p>
		<h3>Forms from secure api end point:</h3>
		<ul v-if="forms.length">
			<li v-for="form in forms" :key="form.id">
				{{ form.name }}: {{ form.description }}
			</li>
		</ul>
		<div v-if="forms.loading" class="spinner-border spinner-border-sm" />
		<div v-if="forms.error" class="text-danger">
			Error loading users: {{ forms.error }}
		</div>
	</div>
</template>
