<template>
	<v-btn @click="signInWithFacebookProvider" flat variant="text">
		<v-img :src="facebookProvider" aspect-ratio="1" max-width="30" />
	</v-btn>
</template>

<script setup lang="ts">
import facebookProvider from '@/assets/img/facebook-provider.png'
import { AuthService } from '@/services/auth';

const emit = defineEmits<{
	(e: 'success'): void;
	(e: 'error', err: unknown): void;
}>();

const signInWithFacebookProvider = () => {
	AuthService.signInWithFacebook().then(() => emit('success')).catch(e => {
		console.error(e);
		emit('error', e);
	});
}
</script>