<template>
	<div>
		<div class="title mb-7">
			<h3 class="text-h4">Категории</h3>
		</div>
		<section>
			<v-row>
				<v-col cols="6" md="6" sm="12">
					<div>
						<div class="subtitle">
							<h4 class="text-h5 mb-5">Создать</h4>
						</div>

						<v-form>
							<v-text-field v-model="name" :rules="titleRules" variant="underlined" label="Название" />

							<v-text-field v-model="limit" :rules="limitRules" variant="underlined" type="number"
								label="Лимит" />

							<v-btn color="green-darken-3" type="submit">
								Создать
								<v-icon icon="mdi-send" class="ml-3" />
							</v-btn>
						</v-form>
					</div>
				</v-col>
				<v-col cols="6" md="6" sm="12">
					<div>
						<div class="subtitle">
							<h4 class="text-h5 mb-5">Редактировать</h4>
						</div>
						<v-form>

							<v-select label="Выберите категорию" variant="underlined" :items="['Category']"></v-select>


							<v-text-field v-model="name" :rules="titleRules" variant="underlined" label="Название" />

							<v-text-field v-model="limit" :rules="limitRules" variant="underlined" type="number"
								label="Лимит" />


							<v-btn color="light-green-darken-4" type="submit">
								Обновить
								<v-icon icon="mdi-send" class="ml-3" />
							</v-btn>
						</v-form>
					</div>
				</v-col>
			</v-row>
		</section>
	</div>
</template>

<script setup>
</script>

<style lang="scss" scoped>

</style>