<template>
	<section class="card mt-4">
		<section class="card-header">
			<div class="d-flex justify-content-between">
				<div class="mt-2">
					<i class="fas fa-users fa-lg"></i> Users
				</div>
				<!-- Create user button -->
				<div>
					<button class="btn btn-primary" @click="createRegister" :title="titles.create"> Create User
						<i class="fas fa-plus"></i></button>
				</div>
			</div>
		</section>
		<section class="card-body p-4">

			<!-- Table -->
			<div class="table-responsive" v-if="load_table">
				<DataTable class="display table table-bordered table-hover table-striped table-wrap" :columns="columns"
					:data="data" :options="options">
					<template #column-0="prop">
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

			<!-- Loading -->
			<LoadComponentLayout v-else />


			<!-- Modal -->
			<Modal :options="optionsModal" ref="modal_ref">
				<UserForm :user="user" ref="user_form_ref" @close-modal="modal_ref.closeModal()" @reload-table="getRegister"
					:model="model">
				</UserForm>
			</Modal>
		</section>
	</section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getAll } from '@/services/QueryService'
import UserForm from './UserForm.vue';
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "@/config/Firebase";
import { deleteTime } from "@/services/TimestampService";
import { deleteStatementAlert, successAlert } from '@/services/AlertServices'
import LoadComponentLayout from '@/app/views/layouts/LoadComponentLayout.vue'



// Modal -------------------------------
const modal_ref = ref(null)
const optionsModal = ref({
	id: 'userModal',
	title: null
})

// User Form ---------------------------
const user_form_ref = ref(null) //no sirve
const user = ref(null)
const model = ref('users')
const titles = ref({
	create: 'Create User',
	update: 'Update User',
	delete: 'Delete User'
})

const createRegister = () => {
	optionsModal.value.title = titles.value.create;
	user.value = null;
	modal_ref.value.openModal();
}
const editRegister = (data) => {
	optionsModal.value.title = titles.value.update;
	user.value = data;
	modal_ref.value.openModal();
}
const deleteRegister = async (data) => {
	if (!await deleteStatementAlert()) return
	load_table.value = false
	const data_send = deleteTime(data);
	await updateDoc(doc(firestore, model.value, data.id), data_send);
	await successAlert({ title: 'Deleted successfully!' })
	getRegister();
}

// DataTable ----------------------------
const data = ref([]);
const load_table = ref(false);
const dataArray = ref([])

const exportOptions = {
	columns: ':not(:first)'
};
const options = ref({
	dom: 'Bfrtip',
	buttons: [
		'pageLength',
		{ extend: 'copy', exportOptions },
		{ extend: 'excel', exportOptions },
		{ extend: 'pdf', exportOptions },
		{ extend: 'csv', exportOptions },
	],
	lengthMenu: [
		[10, 50, 100, -1],
		['10 rows', '50 rows', '100 rows', 'Show all']
	],
})
const columns = ref([
	{ data: null, title: 'Actions' },
	{ data: 'full_name', title: 'Full Name' },
	{ data: 'email', title: 'Email' },
	{ data: 'phone', title: 'Phone' },
	{ data: 'role', title: 'Role' },
	{ data: 'country', title: 'Country' },
	{ data: 'created_at', title: 'Created at' },
	{ data: 'updated_at', title: 'Updated at' },
]);

const getRegister = async () => {
	load_table.value = false
	dataArray.value = []

	const dataFirebase = await getAll(model.value)
	dataFirebase.forEach(doc => {
		dataArray.value.push({ id: doc.id, ...doc.data() })
	});
	load_table.value = true
	data.value = []
	data.value = dataArray.value
	// setTimeout(() => {
	// 	data.value = dataArray.value
	// 	console.log(data.value);
	// 	setTimeout(() => {
	// 		data.value = []
	// 		dataArray.value.splice(1, 1)
	// 		setTimeout(() => {
	// 			data.value = dataArray.value
	// 		}, 9000);
	// 	}, 9000);
	// }, 9000);

}

watch(() => dataArray.value, (newTitle, oldTitle) => {

}, { deep: true });


const actionCLick = (type, data) => {
	if (type == titles.value.delete) {
		deleteRegister(data)
		return;
	}
	editRegister(data)
	return
};

getRegister();

</script>
@/app/AlertServices