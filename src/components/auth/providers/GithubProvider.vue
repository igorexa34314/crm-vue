<template>
	<v-btn @click="signInWithGithubProvider" flat variant="text">
		<v-img :src="githubProvider" aspect-ratio="1" max-width="32" />
	</v-btn>
</template>

<script setup lang="ts">
import { AuthService } from '@/services/auth';
import { useTheme } from 'vuetify';

const theme = useTheme();
const githubProvider = new URL(`/src/assets/img/github-provider${theme.global.current.value.dark ? '_light' : ''}.png`, import.meta.url).href;

const emit = defineEmits<{
	(e: 'success'): void;
	(e: 'error', err: unknown): void;
}>();

const signInWithGithubProvider = () => {
	AuthService.signInWithGithub().then(() => emit('success')).catch(e => {
		console.error(e);
		emit('error', e);
	});
}
</script>