<template>
  <NuxtLayout>
    <GlobalSnackbar />
    <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import GlobalSnackbar from '@/components/app/GlobalSnackbar.vue';

const AppTitle = import.meta.env.APP_TITLE || 'CRM VUE';
const { t } = useI18n({ inheritLocale: true, useScope: 'global' });

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${t(titleChunk)} | ${AppTitle} ` : AppTitle;
  }
});
</script>

<style lang="scss"></style>
