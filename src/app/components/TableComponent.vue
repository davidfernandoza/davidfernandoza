<template>
	<div class="table-responsive">
		<DataTable class="display table table-bordered table-hover table-striped table-wrap" :columns="columns" :data="data"
			:options="options">
			<template #column-0="prop" v-if="withActions">
				<div class="d-flex justify-content-center">
					<button @click="actionCLick(titles.update, prop.rowData)" class="btn btn-warning btn-sm"
						:title="titles.update">
						<i class="fas fa-pencil-alt"></i>
					</button>
					<button @click="actionCLick(titles.delete, prop.rowData)" class="btn btn-danger btn-sm mx-1"
						:title="titles.delete">
						<i class="fas fa-trash-alt"></i>
					</button>
				</div>
			</template>
		</DataTable>
	</div>
</template>

<script setup>
import { computed } from 'vue'
const emit = defineEmits(['edit-register', 'delete-register'])
const { data, columns, options, titles } = defineProps([
	'data',
	'columns',
	'options',
	'titles'
])

const withActions = computed(() => {
	const action = columns.find(column => column.title == 'Actions')
	return action ? true : false
})

const actionCLick = (type, data) => {
	type == titles.delete
		? emit('delete-register', data)
		: emit('edit-register', data)
}
</script>