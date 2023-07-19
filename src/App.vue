<template>
  <metainfo v-slot:title="{ content }: any">
      {{ content ? `${ t(content) } | ${ AppTitle } ` : AppTitle }}
  </metainfo>
  <GlobalSnackbar />
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <app-loader class="mt-7" page />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import GlobalSnackbar from '@/components/app/GlobalSnackbar.vue';

const AppTitle = import.meta.env.VITE_APP_TITLE || 'CRM VUE';
const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
