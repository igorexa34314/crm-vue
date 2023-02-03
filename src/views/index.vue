<template>
	<div>
		<div class="d-flex flex-row align-center">
			<h3 class="title text-h4 flex-grow-1 my-2 ">Счет</h3>
			<v-btn color="green-darken-2">
				<v-icon icon="mdi-refresh" />
			</v-btn>
		</div>
		<v-divider color="black" thickness="1.5" class="bg-white mt-1 mb-8" />
		<v-row>
			<v-col cols="4" lg="4" md="6" sm="12">
				<v-card color="light-blue darken-3 pa-4" elevation="3" min-height="300">
					<v-card-title class="text-h5 mb-6">Счет в валюте</v-card-title>
					<v-card-text class="text-white text-h5">
						<span>12.0 Р</span>
					</v-card-text>
					<v-divider color="white" thickness="2.5" class="bg-white mt-3 mx-4" />
				</v-card>
			</v-col>

			<v-col cols="8" lg="8" md="6" sm="12">
				<v-card color="deep-orange-darken-1" elevation="3" min-height="300">
					<v-card-item>
						<v-card-title class="mx-3 mt-3">Курс валют</v-card-title>
					</v-card-item>
					<v-card-text>
						<v-table class="bg-transparent">
							<thead>
								<tr>
									<th class="text-white text-subtitle-1 font-weight-bold">Валюта</th>
									<th class="text-white text-subtitle-1 font-weight-bold">Курс</th>
									<th class="text-white text-subtitle-1 font-weight-bold">Дата</th>
								</tr>
							</thead>
							<tbody>
								<tr class="text-white text-subtitle-1">
									<td>руб</td>
									<td>12121</td>
									<td>12.12.12</td>
								</tr>
							</tbody>
						</v-table>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.v-theme--light .v-divider {
	--v-border-opacity: 1;
}
.v-theme--light .v-table {
	--v-border-opacity: 0.18;
}
</style>