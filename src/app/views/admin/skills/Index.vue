<template>
	<section class="card mt-4">
		<section class="card-header">
			<div class="d-flex justify-content-between">
				<div class="mt-2">
					<i class="fas fa-users fa-lg"></i> Skills
				</div>
				<!-- Create user button -->
				<div>
					<button class="btn btn-primary" @click="createRegister" :title="titles.create"> Create skill
						<i class="fas fa-plus"></i></button>
				</div>
			</div>
		</section>
		<section class="card-body p-4">

			<!-- Table -->
			<TableComponent v-if="loadTable" :data="data" :columns="columns" :options="options" :titles="titles"
				@delete-register="deleteRegister" @edit-register="editRegister">
			</TableComponent>

			<!-- Loading -->
			<LoadComponentLayout v-else>
			</LoadComponentLayout>


			<!-- Modal -->
			<Modal :options="optionsModal" ref="modalRef">
				<SkillForm :skill="skill" @close-modal="modalRef.closeModal()" @reload-table="getRegister" :model="model">
				</SkillForm>
			</Modal>
		</section>
	</section>
</template>

<script setup>
import SkillForm from './SkillForm.vue';
import TableComponent from '@/app/components/TableComponent.vue'
import LoadComponentLayout from '@/app/views/layouts/LoadComponentLayout.vue'
import { ref } from 'vue'
import { getAll } from '@/services/QueryService'
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "@/config/Firebase";
import { deleteStatementAlert, successAlert } from '@/services/AlertServices'




// Modal -------------------------------
const modalRef = ref(null)
const optionsModal = ref({
	id: 'skillModal',
	title: null
})

// Skill Form ---------------------------
const skill = ref(null)
const model = ref('skillInformation')
const titles = ref({
	create: 'Create Skill',
	update: 'Update Skill',
	delete: 'Delete Skill'
})

const createRegister = () => {
	optionsModal.value.title = titles.value.create;
	skill.value = null;
	modalRef.value.openModal();
}
const editRegister = (data) => {
	optionsModal.value.title = titles.value.update;
	skill.value = data;
	modalRef.value.openModal();
}
const deleteRegister = async (data) => {
	if (!await deleteStatementAlert()) return
	loadTable.value = false
	await deleteDoc(doc(firestore, model.value, data.id))
	await successAlert({ reload: true, title: 'Deleted successfully!' })
}

// DataTable ----------------------------
const loadTable = ref(false);
const data = ref([])

const exportOptions = {
	columns: ':not(:nth-child(1)):not(:nth-child(2))',
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
	{
		data: null,
		title: 'Actions',
		className: 'text-center'
	},
	{
		data: 'imageURL',
		title: 'Image',
		className: 'text-center',
		render: (data) => `<img src="${data}" width="40" height="40" class="object-fit-cover border" />`
	},
	{
		data: 'name',
		title: 'Name',
		className: 'text-center'
	},
]);


// Get data ------------------------------
const getRegister = async () => {
	loadTable.value = false
	data.value = []
	const dataFirebase = await getAll({ model: model.value })
	data.value = dataFirebase
	loadTable.value = true
}

getRegister();

</script>
