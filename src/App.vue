<template>
  <metainfo>
    <template #title="{ content }: any">
      {{ content ? `${ useLocalizeFilter(content) } | ${ AppTitle } ` : AppTitle }}
    </template>
  </metainfo>
  <GlobalSnackbar />
  <Suspense>
    <router-view />
  </Suspense>
</template>

<script setup lang="ts">
import GlobalSnackbar from '@/components/app/GlobalSnackbar.vue';
import { useLocalizeFilter } from '@/filters/localizeFilter';

const AppTitle = import.meta.env.VITE_APP_TITLE || 'CRM VUE';
</script>

<style lang="scss"></style>
