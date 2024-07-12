<template>
	<BackendError :error="errorBackend" @close-alert-backend="clearErrorBackend">
	</BackendError>

	<Form @submit="loginUser" :validation-schema="schema" ref="form">
		<!-- Email -->
		<div class="mb-3">
			<label for="email" class="form-label">Email</label>
			<Field name="email" v-slot="{ errorMessage, field }" v-model="userSend.email">
				<input type="email" id="email" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`" required
					placeholder="EX: example@email.com" title="Email Required" v-bind="field">
				<span class="invalid-feedback">{{ errorMessage }}</span>
			</Field>
		</div>

		<!-- Password -->
		<div class="mb-1">
			<label for="password" class="form-label">Password </label>
			<Field name="password" v-slot="{ errorMessage, field }" v-model="userSend.password">
				<div class="input-group">
					<!-- Input -->
					<input :type="showPassword ? 'text' : 'password'" id="password"
						:class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
						:placeholder="!showPassword ? 'EX: ********' : 'EX: asecR3t*'" required title="Password Required"
						v-bind="field">

					<!-- Show Password -->
					<button class="btn btn-outline-secondary show-button" type="button" id="button-addon2"
						@click="() => showPassword = !showPassword">
						<span v-show="showPassword">
							<i class="fa-solid fa-eye-slash"></i>
						</span>
						<span v-show="!showPassword">
							<i class="fa-solid fa-eye"></i>
						</span>
					</button>
					<span class="invalid-feedback">{{ errorMessage }}</span>
				</div>
			</Field>
		</div>

		<!-- Forgot password? -->
		<div class="w-100 d-flex justify-content-start ms-0 ps-0 mb-4">
			<button type="button" class="btn btn-link ms-0 ps-0" @click="openForgotPassword">I do forgot password</button>
		</div>

		<!-- Footer -->
		<section class="d-flex justify-content-between">
			<small>I don't have an account, i like goto<button class="btn btn-link ps-1 pb-1 pt-0 m-0" @click="openeRegiter">
					Register</button> </small>
			<div class="d-flex justify-content-end">

				<button type="button" class="btn btn-secondary mx-1 px-2" @click="closeModal" :disabled="loadSend"> Cancel
				</button>
				<button type="sumbit" :class="`btn btn-primary ${loadSend ? 'px-1 py-0' : ''}`" :disabled="loadSend">
					<span v-if="!loadSend">Send</span>
					<div v-else>
						<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
						<span role="status" class="ms-2">Loading</span>
					</div>
				</button>
			</div>
		</section>
	</Form>
</template>

<script setup>
import { Field, Form } from 'vee-validate'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/config/Firebase'
import { computed, ref } from 'vue'
import { loginValidate } from '@/services/validatios/auth'
import BackendError from '@/components/BackendError.vue';
import errorMessages from '@/helpers/errorMessages'


// Computed --------------------------
const schema = computed(loginValidate)

// Emits -----------------------------
const emit = defineEmits(['close-modal', 'open-register', 'open-forgot-password']);

// Variables--------------------------
const loadSend = ref(false)
const errorBackend = ref(null)
const showPassword = ref(false)
const userSend = ref({
	email: null,
	password: null,
})

// Method ---------------------------
const loginUser = async () => {
	try {
		loadSend.value = true
		const { email, password } = userSend.value
		await signInWithEmailAndPassword(auth, email, password)
		closeModal()
	} catch (error) {
		console.error(error.code, error.message);
		if (error.code === 'auth/too-many-requests') {
			errorBackend.value = errorMessages.loginManyRequests
		} else {
			errorBackend.value = errorMessages.loginError
		}
	}
	loadSend.value = false
}

const openeRegiter = () => {
	closeModal()
	emit('open-register')
}
const openForgotPassword = () => {
	closeModal()
	emit('open-forgot-password')
}
const clearErrorBackend = () => errorBackend.value = null
const closeModal = () => emit('close-modal');

</script>
