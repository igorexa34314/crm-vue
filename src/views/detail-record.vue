<template>
	<div>
		<div>
			<v-breadcrumbs :items="['История', 'Расход']">
				<!-- <template v-slot:title="{ item }" class="text-subtitle-1">
					{{ item.title.toUpperCase() }}
				</template> -->
				<template v-slot:divider>
					<v-icon icon="mdi-chevron-right" />
				</template>
			</v-breadcrumbs>

			<v-row class="mt-4">
				<v-col cols="6" md="6" sm="12">
					<v-card class="pa-3" color="red">
						<v-card-text class="text-subtitle-1">
							<p>Описание:</p>
							<p>Сумма:</p>
							<p>Категория:</p>
							<small>12.12.12</small>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script setup>
</script>

<style lang="scss" scoped>

</style>