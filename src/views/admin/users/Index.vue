<template>
	<section class="card mt-4">
		<section class="card-header">
			<div class="d-flex justify-content-between">
				<div class="mt-2">
					<i class="fas fa-users fa-lg"></i> Users
				</div>
				<!-- Create user button -->
				<div>
					<button class="btn btn-primary" @click="() => modal_ref.openModal()">
						Create User <i class="fas fa-plus"></i></button>
				</div>
			</div>
		</section>
		<section class="card-body p-4">
			<!-- Table -->
			<DataTable class="display table table-bordered table-hover table-striped table-wrap" :columns="columns"
				:data="data" :options="options">
				<template #column-4="prop">
					<div class="d-flex justify-content-center">
						<button @click="rowClick('update', prop.rowData)" class="btn btn-warning btn-sm" title="Edit User">
							<i class="fas fa-pencil-alt"></i>
						</button>
						<button @click="rowClick('delete', prop.rowData)" class="btn btn-danger btn-sm mx-1" title="Delete User">
							<i class="fas fa-trash-alt"></i>
						</button>
					</div>
				</template>
			</DataTable>
		</section>
		<section>
			<Modal modal_id="user_modal" ref="modal_ref">
				<UserForm ref="body"></UserForm>
			</Modal>
		</section>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import UserForm from './UserForm.vue';

const modal_ref = ref(null)

const options = ref({
	responsive: true,
	dom: 'Bfrtip',
	buttons: ['pageLength', 'copy', 'csv', 'excel', 'pdf'],
	lengthMenu: [
		[10, 50, 100, -1],
		['10 rows', '50 rows', '100 rows', 'Show all']
	],
});

const columns = ref([
	{ data: 'full_name', title: 'Full Name' },
	{ data: 'email', title: 'Email' },
	{ data: 'phone', title: 'Phone' },
	{ data: 'created_at', title: 'Created at' },
	{ data: null, title: 'Actions' },
]);

const data = ref([
	{ id: 1, full_name: 'David Fernando Torres', email: 'fernando.zapata.live@gmail.com', phone: '3107148905', created_at: Date() },
	{ id: 2, full_name: 'Carlos', email: 'carlos@gmail.com', phone: '3117148953', created_at: Date() },
]);



const rowClick = (type, data) => {
	console.log(data, type)
};



</script>
