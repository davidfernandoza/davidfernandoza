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
					<li class="nav-item">
						<button class="nav-link" @click="openModalRegister">Register</button>
					</li>
					<li class="nav-item">
						<button class="nav-link" @click="openModalLogin">Login</button>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<section>
		<!-- Modal -->
		<!-- <Modal :options="optionsModalLogin" ref="modalLoginRef">
			<Login @close-modal="modalLoginRef.closeModal()">
			</Login>
		</Modal> -->
		<Modal :options="optionsModalRegister" ref="modalRegisterRef">
			<Register @close-modal="modalRegisterRef.closeModal()">
			</Register>
		</Modal>
	</section>

</template>

<script setup>

import { ref } from 'vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'


// Modal -------------------------------
const modalLoginRef = ref(null)
const modalRegisterRef = ref(null)

const optionsModalLogin = ref({
	id: 'loginModal',
	title: 'Login'
})
const optionsModalRegister = ref({
	id: 'registerModal',
	title: 'Register'
})

const openModalRegister = () => {
	modalRegisterRef.value.openModal();
}
const openModalLogin = () => {
	modalLoginRef.value.openModal();
}
</script>