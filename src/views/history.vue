<template>
	<div>
		<div class="title">
			<h3 class="text-h5">История записей</h3>
		</div>
		<v-divider color="black" thickness="1.5" class="bg-white mt-1 mb-8" />
		<div class="history-chart">
			<canvas></canvas>
		</div>

		<section>
			<v-table>
				<thead>
					<tr>
						<th>#</th>
						<th>Сумма</th>
						<th>Дата</th>
						<th>Категория</th>
						<th>Тип</th>
						<th>Открыть</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>1</td>
						<td>1212</td>
						<td>12.12.32</td>
						<td>name</td>
						<td>
							<span class="py-2 px-3 text-white text-center bg-red-darken-4">Расход</span>
						</td>
						<td>
							<v-btn color="teal-darken-1">
								<v-icon icon="mdi-open-in-new" />
							</v-btn>
						</td>
					</tr>
				</tbody>
			</v-table>
		</section>
	</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>