<template>
	<v-btn @click="signInWithGoogleProvider" flat variant="text">
		<v-img :src="googleProvider" aspect-ratio="1" max-width="30" />
	</v-btn>
</template>

<script setup lang="ts">
import googleProvider from '@/assets/img/google-provider.png';
import { signInWithGoogle } from '@/services/auth';

const emit = defineEmits<{
	(e: 'success'): void;
	(e: 'error', err: unknown): void;
}>();

const signInWithGoogleProvider = () => {
	signInWithGoogle().then(() => emit('success')).catch(e => {
		console.error(e);
		emit('error', e);
	});
}
</script>