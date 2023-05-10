<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';
import homeMachine from '@/utils/homeMachine';

const authStore = useAuthStore();
const { userMail } = storeToRefs(authStore);

// const formsStore = useFormsStore();
// const { forms } = storeToRefs(formsStore);

// formsStore.getAll();

const { state, send } = useMachine(homeMachine, { devTools: true });
send('FETCH');
</script>

<template>
	<div>
		<h1>Hi {{ userMail }}!</h1>
		<p>You're logged in with Vue 3 + Pinia & JWT!!</p>
		<h3>Forms from secure api end point:</h3>
		<div v-if="state.matches('success') || state.matches('ready')">
			<ul v-if="state.context.forms.length">
				<li v-for="form in state.context.forms" :key="form.id">
					{{ form.name }}: {{ form.description }}
				</li>
			</ul>
			<div v-else>
				No forms created yet.
			</div>

			<button>Create</button>
		</div>

		<div v-if="state.matches('loading') || state.matches('initial')" class="spinner-border spinner-border-sm" />
		<div v-if="state.matches('failure')" class="text-danger">
			Error loading users: {{ state.context.error }}
			<button @click="send('RETRY')">
				Retry
			</button>
		</div>
	</div>
</template>
