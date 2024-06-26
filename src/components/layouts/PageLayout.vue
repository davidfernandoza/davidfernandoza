<template>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">Navbar</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
				aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="#">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Blog</a>
					</li>
				</ul>

				<!-- Auth Buttons -->
				<div class="w-100 d-flex justify-content-end">
					<ul class="navbar-nav" v-if="!user">
						<li class="nav-item">
							<button class="nav-link" @click="openModalRegister">Register</button>
						</li>
						<li class="nav-item">
							<button class="nav-link" @click="openModalLogin">Login</button>
						</li>
					</ul>
					<ul class="navbar-nav" v-else>
						<li class="nav-item dropdown">
							<button class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								{{ user.displayName ?? user.email }}
							</button>

							<!-- Dropdown Menu -->
							<ul class="dropdown-menu">
								<li>
									<button class="dropdown-item" @click="openModalProfile">
										Profile
									</button>
								</li>
								<li>
									<button class="dropdown-item" @click="logout">
										Logout
									</button>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>

	<section>
		<!-- Modal -->
		<Modal :options="optionsModalLogin" ref="modalLoginRef">
			<Login @close-modal="modalLoginRef.closeModal()">
			</Login>
		</Modal>
		<Modal :options="optionsModalRegister" ref="modalRegisterRef">
			<Register @close-modal="modalRegisterRef.closeModal()">
			</Register>
		</Modal>
		<Modal :options="optionsModalProfile" ref="modalProfileRef">
			<Profile @close-modal="modalRegisterRef.closeModal()">
			</Profile>
		</Modal>
	</section>

</template>

<script setup>

import { ref } from 'vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Profile from '@/views/auth/Profile.vue'
import { signOut } from "firebase/auth";
import { auth } from '@/config/Firebase'
import { storeToRefs } from 'pinia'
import { useAuthUser } from '@/stores/auth.js'

const store = useAuthUser()
const { user } = storeToRefs(store)


// Modal -------------------------------
const modalLoginRef = ref(null)
const modalRegisterRef = ref(null)
const modalProfileRef = ref(null)

const optionsModalLogin = ref({
	id: 'loginModal',
	title: 'Login'
})
const optionsModalRegister = ref({
	id: 'registerModal',
	title: 'Register'
})
const optionsModalProfile = ref({
	id: 'profileModal',
	title: 'Profile'
})

const logout = async () => {
	try {
		await signOut(auth)
	} catch (error) {
		console.log(error);
	}
}

const openModalRegister = () => {
	modalRegisterRef.value.openModal();
}
const openModalLogin = () => {
	modalLoginRef.value.openModal();
}
const openModalProfile = () => {
	modalProfileRef.value.openModal();
}
</script>