<template>
	<v-textarea v-bind="{ variant }" validate-on="blur lazy" :density="xs ? 'compact' : 'default'" class="text-input">
		<template #message="{ message }">
			{{ t(message) }}
		</template>
	</v-textarea>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { VTextarea } from 'vuetify/components';
import { useDisplay } from 'vuetify';

const props = withDefaults(
	defineProps<{
		variant?: VTextarea['variant'];
	}>(),
	{
		variant: 'underlined',
	}
);

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { xs } = useDisplay();
</script>
