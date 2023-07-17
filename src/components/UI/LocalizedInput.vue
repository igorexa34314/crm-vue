<template>
	<v-text-field v-bind="{ variant }" validate-on="blur lazy" class="text-primary" :density="xs ? 'compact' : 'default'">
		<template #message="{ message }">
			{{ t(message) }}
		</template>
	</v-text-field>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { VTextField } from 'vuetify/components';
import { useDisplay } from 'vuetify';

const props = withDefaults(defineProps<{
	variant?: VTextField['variant']
}>(), {
	variant: 'underlined'
});

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { xs } = useDisplay();
</script>
