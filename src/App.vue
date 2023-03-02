<template>
  <metainfo>
    <template v-slot:title="{ content }">
      {{ content ? `${useLocalizeFilter(content)} | ${AppTitle}` : AppTitle }}</template>
  </metainfo>
  <GlobalSnackbar />
  <router-view />
</template>

<script setup lang="ts">
import GlobalSnackbar from '@/components/app/GlobalSnackbar.vue';
import { useLocalizeFilter } from '@/filters/localizeFilter';

const AppTitle = import.meta.env.VITE_APP_TITLE;
</script>

<style lang="scss"></style>
