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
								<img :src="avatar" alt="avatar" width="30" height="30" class=" rounded-circle me-2 border mb-1">
								<span>
									{{ user.displayName ?? user.email }}
								</span>
							</button>

							<!-- Dropdown Menu -->
							<ul class="dropdown-menu">
								<li v-if="!user.emailVerified">
									<p class="px-3 c-red">
										<i class="fa-solid fa-circle-exclamation"></i>
										<small class="ms-2">Email for verification!</small>
									</p>
								</li>
								<li v-if="user.emailVerified">
									<button class="dropdown-item" @click="openModalProfile">
										<i class="fa-solid fa-address-card"></i>
										<span class="ms-2"> Profile</span>
									</button>
								</li>
								<li>
									<button class="dropdown-item" @click="openModalSecurity">
										<i class="fa-solid fa-shield-halved"></i>
										<span class="ms-3">Password and security</span>
									</button>
								</li>
								<li>
									<button class="dropdown-item" @click="logout">
										<i class="ms-1 fa-solid fa-right-from-bracket"></i>
										<span class="ms-3">Logout</span>
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
			<Login @close-modal="modalLoginRef.closeModal()" @open-register="openModalRegister"
				@open-forgot-password="openModalForgotPassword">
			</Login>
		</Modal>
		<Modal :options="optionsModalRegister" ref="modalRegisterRef">
			<Register @close-modal="modalRegisterRef.closeModal()" @open-login="openModalLogin">
			</Register>
		</Modal>
		<Modal :options="optionsModalProfile" ref="modalProfileRef">
			<Profile @close-modal="modalProfileRef.closeModal()">
			</Profile>
		</Modal>
		<Modal :options="optionsModalForgotPassword" ref="modalForgotPasswordRef">
			<ForgotPassword @close-modal="modalForgotPasswordRef.closeModal()" @open-login="openModalLogin">
			</ForgotPassword>
		</Modal>
		<Modal :options="optionsModalSecurity" ref="modalSecurityRef">
			<Security @close-modal="modalSecurityRef.closeModal()">
			</Security>
		</Modal>
	</section>

</template>

<script setup>

import Register from '@/views/auth/Register.vue'
import Security from '@/views/auth/Security.vue'
import Login from '@/views/auth/Login.vue'
import Profile from '@/views/users/Profile.vue'
import ForgotPassword from '@/views/auth/ForgotPasswor.vue'
import imageDefault from '@/helpers/ImagesDefaul.js'

import { ref } from 'vue'
import { signOut } from "firebase/auth";
import { auth } from '@/config/Firebase'
import { storeToRefs } from 'pinia'
import { useAuthUser } from '@/stores/auth.js'

//  Store Pinia -----------------------------
const store = useAuthUser()
const { user } = storeToRefs(store)

// Avatar ----------------------------------
const avatar = ref(user.value?.photoURL ?? imageDefault.avatar)

// Modal -------------------------------
const modalLoginRef = ref(null)
const modalRegisterRef = ref(null)
const modalProfileRef = ref(null)
const modalForgotPasswordRef = ref(null)
const modalSecurityRef = ref(null)

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
const optionsModalForgotPassword = ref({
	id: 'forgotPasswordModal',
	title: 'Forgot Password'
})
const optionsModalSecurity = ref({
	id: 'securityModal',
	title: 'Password and security'
})

const logout = async () => {
	try {
		await signOut(auth)
		window.location.reload()
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
const openModalForgotPassword = () => {
	modalForgotPasswordRef.value.openModal();
}
const openModalSecurity = () => {
	modalSecurityRef.value.openModal();
}
</script>@/views/users/Profile.vue