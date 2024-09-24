<template>
	<BackendError :error="errorBackend" @close-alert-backend="clearErrorBackend">
	</BackendError>

	<Form @submit="registerUser" :validation-schema="schema" ref="form">
		<!-- Email -->
		<div class="mb-2">
			<label for="email" class="form-label">Email <small>(<span class="c-red">*</span>)</small></label>
			<Field name="email" v-slot="{ errorMessage, field }" v-model="userSend.email">
				<input type="email" id="email" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
					placeholder="EX: example@email.com" required title="Email Required" v-bind="field">
				<span class="invalid-feedback">{{ errorMessage }}</span>
			</Field>
		</div>

		<!-- Password -->
		<div class="mb-2">
			<label for="password" class="form-label">Password <small>(<span class="c-red">*</span>)</small></label>
			<Field name="password" v-slot="{ errorMessage, field }" v-model="userSend.password">
				<div class="input-group">
					<!-- Input -->
					<input :type="showPassword ? 'text' : 'password'" id="password"
						:class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
						:placeholder="!showPassword ? 'EX: ********' : 'EX: asecR3t*'" required title="Password Required"
						v-bind="field">

					<!-- Show Password -->
					<button class="btn btn-outline-secondary show-button" type="button"
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

		<!-- Password Confirm -->
		<div class="mb-3">
			<label for="passwordConfirmation" class="form-label">
				Password Confirmation <small>(<span class="c-red">*</span>)</small></label>
			<Field name="passwordConfirmation" v-slot="{ errorMessage, field }" v-model="userSend.passwordConfirmation">
				<div class="input-group">
					<!-- Input -->
					<input :type="showPassword ? 'text' : 'password'" id="passwordConfirmation"
						:class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
						:placeholder="!showPassword ? 'EX: ********' : 'EX: asecR3t*'" required title="Confirm Password Required"
						v-bind="field">

					<!-- Show Password -->
					<button class="btn btn-outline-secondary show-button" type="button"
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

		<!-- Staiment -->
		<div class="mb-3 mt-3 d-flex justify-content-end">
			<div class="form-text">This symbol (<span class="c-red">*</span>) is means required
			</div>
		</div>

		<!-- Footer -->
		<section class="d-flex justify-content-between">

			<small>I have an account, i like goto<button type="button" class="btn btn-link ps-1 pb-1 pt-0 m-0"
					@click="openLogin">Login</button> </small>

			<div class="d-flex justify-content-end">
				<button type="button" class="btn btn-secondary mx-1 px-2" @click="closeModal" v-if="!loadSend"> Cancel
				</button>
				<button type="sumbit" class="btn btn-primary" :disabled="loadSend">
					<span v-if="!loadSend">Send</span>
					<div v-else>
						<LoadComponentLayout type="button" />
					</div>
				</button>

			</div>
		</section>
	</Form>
</template>

<script setup>
import errorMessages from '@/helpers/errorMessages'
import successMessages from '@/helpers/successMessages'
import LoadComponentLayout from '@/app/views/layouts/LoadComponentLayout.vue'
import { Field, Form } from 'vee-validate'
import { successAlert } from '@/services/AlertServices'
import { computed, ref } from 'vue'
import { registerValidate } from '@/app/schemas/AuthSchema'
import { firestore } from "@/config/Firebase"
import { collection, addDoc } from "firebase/firestore"
import { PersonalInformation } from '@/helpers/colectionNames'
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification
} from "firebase/auth"


// Computed --------------------------
const schema = computed(registerValidate)

// Emits -----------------------------
const emit = defineEmits(['close-modal', 'open-login'])

// Variables--------------------------
const loadSend = ref(false)
const showPassword = ref(false)
const errorBackend = ref(null)
const userSend = ref({
	email: null,
	password: null,
	passwordConfirmation: null,
})

// Method ---------------------------
const registerUser = async () => {
	try {
		loadSend.value = true
		const auth = getAuth();
		const { email, password } = userSend.value
		const { user } = await createUserWithEmailAndPassword(auth, email, password)
		sendEmailVerification(auth.currentUser)
		addDoc(collection(firestore, PersonalInformation), {
			userUID: user.uid,
		});
		await successAlert({ reload: true, message: successMessages.registerSuccess })
	} catch (error) {
		console.error(error.code, error.message);
		errorBackend.value = errorMessages.registerError
	}
	loadSend.value = false
}

const openLogin = () => {
	closeModal()
	emit('open-login')
}
const clearErrorBackend = () => errorBackend.value = null
const closeModal = () => emit('close-modal');

</script>
@/app/schemas/AuthSchema