<template>
	<v-btn @click="signInWithGithubProvider" flat variant="text">
		<v-img :src="githubProvider" aspect-ratio="1" max-width="30" />
	</v-btn>
</template>

<script setup lang="ts">
import githubProvider from '@/assets/img/github-provider.png';
import { signInWithGithub } from '@/services/auth';

const emit = defineEmits<{
	(e: 'success'): void;
	(e: 'error', err: unknown): void;
}>();

const signInWithGithubProvider = () => {
	signInWithGithub().then(() => emit('success')).catch(e => {
		console.error(e);
		emit('error', e);
	});
}
</script>