<script setup lang="ts">
definePageMeta({ middleware: ['auth'] });
useHead({ title: 'pageTitles.home' });

navigateTo('/');
</script>