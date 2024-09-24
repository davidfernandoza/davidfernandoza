<template>
	<section>
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item active" aria-current="page">/ Dashboard</li>
			</ol>
		</nav>
		<section class="row">
			<section class="card col-5 m-0 p-0">
				<section class="card-header d-flex align-items-center py-1">
					<i class="fa-solid fa-chart-simple"></i>
					<h2 class="h6 mt-2 ms-1">Analitics</h2>
				</section>
				<section class="card-body">
					<h2 class="card-title">Hola</h2>
				</section>
			</section>
			<section class="card col-7 m-0 p-0">
				<section class="card-header d-flex align-items-center py-1">
					<i class="fa-solid fa-cat"></i>
					<h2 class="h6 mt-2 ms-1">My profile</h2>
				</section>
				<section class="card-body">
					<div v-if="loadAdminInformation">
						<p>{{ adminInformation.summary }}</p>
						Mi información es:
						<ul>
							<li><b>Name: </b>{{ adminInformation.fullName }}</li>
							<li><b>Country: </b>{{ adminInformation.country }}</li>
							<li><b>Phone: </b>
								{{ adminInformation.prefixCode }} {{ adminInformation.phone }}</li>
							<li><b>Email: </b>{{ adminInformation.email }}</li>
							<li><b>Github: </b><a :href="adminInformation.github" target="_blank">Go to Github</a></li>
							<li><b>Linkedin: </b><a :href="adminInformation.linkedin" target="_blank">Go to Linkedin</a></li>
							<li v-if="adminInformation.coriculumVitaeURL"><b>Curiculum Vitae: </b><a
									:href="adminInformation.coriculumVitaeURL" target="_blank">Go to CV</a></li>
						</ul>
					</div>
					<LoadComponentLayout v-else />
				</section>
			</section>

		</section>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import { getOne } from '@/services/QueryService'
import LoadComponentLayout from '@/app/views/layouts/LoadComponentLayout.vue'


// Variables --------------------------
const loadAdminInformation = ref(false)
const adminInformation = ref({})

const getInfoAdmin = async () => {
	loadAdminInformation.value = false
	const admin = await getOne({ model: 'adminInformation' })
	adminInformation.value = admin
	loadAdminInformation.value = true
}

getInfoAdmin()

</script>