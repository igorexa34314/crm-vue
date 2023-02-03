<template>
	<div>
		<div class="title">
			<h3 class="text-h4">Новая запись</h3>
		</div>

		<v-form class="record-form">
			<v-select variant="underlined" label="Выберите категорию" :items="['name cat']" density="comfortable">
			</v-select>

			<v-radio-group>
				<v-radio label="Доход" value="income" density="comfortable" color="orange-accent-3" />
				<v-radio label="Расход" value="outcome" density="comfortable" color="orange-accent-3" />
			</v-radio-group>

			<v-text-field v-model="amount" :rules="amountRules" variant="underlined" label="Сумма" />

			<v-text-field v-model="description" :rules="descriptionRules" variant="underlined" label="Описание" />

			<v-btn type="submit" color="light-blue-darken-4">
				Создать
				<v-icon icon="mdi-send" class="ml-3" />
			</v-btn>
		</v-form>
	</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>