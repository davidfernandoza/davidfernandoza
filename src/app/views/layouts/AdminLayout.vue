<template>
	<section class="admin">
		<div class="d-flex flex-column flex-shrink-0 text-white bg-dark admin__sidebar-container">
			<div class="admin__sidebar-logo">
				<RouterLink to="/admin"
					class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none admin__sidebar-logo-content">
					<svg class="bi me-2 admin__sidebar-logo" width="40" height="32">
						<use xlink:href="#bootstrap"></use>
					</svg>
					<span class="fs-4 admin__sidebar-logo-title">Admin Page</span>
				</RouterLink>
			</div>
			<hr>
			<section class="admin__sidebar-container-menu">
				<ul class="nav nav-pills admin__sidebar-menu">
					<li class="admin__sidebar-menu-item">
						<RouterLink to="/admin" class="nav-link text-white">
							<i class="fas fa-chart-line fa-lg pe-3"></i>
							Dashboard
						</RouterLink>
					</li>
					<li class="admin__sidebar-menu-item">
						<RouterLink to="/admin/skills" class="nav-link text-white">
							<i class="fas fa-list fa-xl pe-3"></i>
							Skills
						</RouterLink>
					</li>
					<li class="admin__sidebar-menu-item">
						<RouterLink to="/admin/projects" class="nav-link text-white">
							<i class="fa-solid fa-box-open fa-xl pe-2"></i>
							Projects
						</RouterLink>
					</li>
					<li class="admin__sidebar-menu-item">
						<RouterLink to="/admin/learning" class="nav-link text-white">
							<i class="fa-solid fa-lines-leaning fa-xl pe-3 ps-1"></i>
							Learning
						</RouterLink>
					</li>
					<li class="admin__sidebar-menu-item">
						<RouterLink to="/admin/studies" class="nav-link text-white">
							<i class="fa-solid fa-graduation-cap fa-xl pe-2"></i>
							Studies
						</RouterLink>
					</li>
					<li class="admin__sidebar-menu-item">
						<RouterLink to="/admin/languages" class="nav-link text-white">
							<i class="fa-solid fa-globe fa-xl pe-3"></i>
							Languages
						</RouterLink>
					</li>
					<li class="admin__sidebar-menu-item">
						<RouterLink to="/admin/blog" class="nav-link text-white">
							<i class="fa-solid fa-blog fa-xl me-1 pe-2 ps-1"></i>
							Blog
						</RouterLink>
					</li>
				</ul>
			</section>
			<hr>
			<div class="dropdown admin__sidebar-footer">
				<a href="#"
					class="d-flex align-items-center text-white text-decoration-none dropdown-toggle admin__sidebar-footer-avatar"
					id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
					<img :src="avatar" alt="Avatar" width="32" height="32" class="rounded-circle me-2">
					<strong>{{ getUsername(user) }}</strong> &nbsp <small> (admin)</small>
				</a>
				<ul class="dropdown-menu dropdown-menu-dark text-small shadow admin__sidebar-footer-menu"
					aria-labelledby="dropdownUser1" style="">
					<li class="admin__sidebar-footer-item">
						<RouterLink to="/" class="dropdown-item">
							<i class="fa-solid fa-house me-2"></i>Home
						</RouterLink>
					</li>
					<li class="admin__sidebar-footer-item">
						<button class="dropdown-item" type="button" @click="openModalProfile">
							<i class="fa-solid fa-address-card me-2"></i>Profile</button>
					</li>
					<li class="admin__sidebar-footer-item">
						<button class="dropdown-item" @click="openModalSecurity">
							<i class="fa-solid fa-shield-halved"></i>
							<span class="ms-2">Security</span>
						</button>
					</li>
					<li>
						<hr class="dropdown-divider">
					</li>
					<li class="admin__sidebar-footer-item">
						<button class="dropdown-item" @click="logout">
							<i class="me-1 fa-solid fa-right-from-bracket"></i> Logout</button>
					</li>
				</ul>
			</div>
		</div>
		<div>
			<Modal :options="optionsModalSecurity" ref="modalSecurityRef">
				<Security @close-modal="modalSecurityRef.closeModal()">
				</Security>
			</Modal>
			<Modal :options="optionsModalProfile" ref="modalProfileRef">
				<Profile @close-modal="modalProfileRef.closeModal()" type="admin">
				</Profile>
			</Modal>
		</div>
	</section>
</template>

<script setup>
import imageDefault from '@/helpers/ImagesDefaul.js'
import Security from '@/app/views/auth/Security.vue'
import Profile from '@/app/views/users/Profile.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthUser } from '@/stores/auth.js'
import { getUsername } from '@/services/UserNameServices.js'
import { auth } from '@/config/Firebase'
import { signOut } from "firebase/auth";


//  Store Pinia -----------------------------
const store = useAuthUser()
const { user } = storeToRefs(store)

// Modal ----------------------------------
const modalProfileRef = ref(null)
const modalSecurityRef = ref(null)

const optionsModalProfile = ref({
	id: 'profileModal',
	title: 'Profile Admin',
	size: 'lg'
})

const optionsModalSecurity = ref({
	id: 'securityModal',
	title: 'Password and security'
})

// Avatar ----------------------------------
const avatar = ref(user.value?.photoURL ?? imageDefault.avatar)

const logout = async () => {
	try {
		await signOut(auth)
		window.location.href = '/'
	} catch (error) {
		console.error(error);
	}
}



const openModalProfile = () => {
	modalProfileRef.value.openModal();
}

const openModalSecurity = () => {
	modalSecurityRef.value.openModal();
}
</script>