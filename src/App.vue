<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content? `${$filters.localize(content)} | ${AppTitle}` : AppTitle
    }}</template>
  </metainfo>
  <snackbar />
  <router-view />
</template>

<script setup>
const AppTitle = import.meta.env.VITE_APP_TITLE;
</script>

<style lang="scss">

</style>
