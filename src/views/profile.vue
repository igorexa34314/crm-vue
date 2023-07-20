<template>
	<div>
		<div class="title text-title">
			<h3 class="text-h5 text-sm-h4 mt-2 mt-sm-4 ml-2">{{ t('pageTitles.profile') }}</h3>
		</div>
		<ProfileForm class="mt-6 mt-sm-8 px-2 px-sm-4" @update-info="updateInfo" @update-avatar="updateAvatar" />
	</div>
</template>

<script setup lang="ts">
import ProfileForm from '@/components/profile/ProfileForm.vue';
import { useMeta } from 'vue-meta';
import { useI18n } from 'vue-i18n';
import { useSnackbarStore } from '@/stores/snackbar';
import { UserService } from '@/services/user';
import { UserInfo } from '@/stores/info';

useMeta({ title: 'pageTitles.profile' });

const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
const { showMessage } = useSnackbarStore();

const updateInfo = async (userdata: Partial<UserInfo>) => {
	try {
		await UserService.updateInfo(userdata);
		showMessage(t('updateProfile_message'));
	} catch (e) {
		showMessage(t(e as string));
	}
}
const updateAvatar = async (avatar: File[]) => {
	try {
		await UserService.updateUserAvatar(avatar);
	} catch (e) {
		showMessage(t(e as string));
	}
}
</script>
