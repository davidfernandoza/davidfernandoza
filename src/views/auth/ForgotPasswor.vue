<template>
	<BackendError :error="errorBackend" @close-alert-backend="clearErrorBackend">
	</BackendError>

	<Form @submit="loginUser" :validation-schema="schema" ref="form">
		<!-- Email -->
		<div class="mb-5">
			<label for="email" class="form-label">Email</label>
			<Field name="email" v-slot="{ errorMessage, field }" v-model="userSend.email">
				<input type="email" id="email" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`" required
					placeholder="EX: example@email.com" title="Email Required" v-bind="field">
				<span class="invalid-feedback">{{ errorMessage }}</span>
			</Field>
		</div>


		<!-- Footer -->
		<section class="d-flex justify-content-end">

			<button type="button" class="btn btn-secondary mx-1 px-2" @click="closeModal" :disabled="loadSend"> Cancel
			</button>
			<button type="sumbit" :class="`btn btn-primary ${loadSend ? 'px-1 py-0' : ''}`" :disabled="loadSend">
				<span v-if="!loadSend">Send</span>
				<div v-else>
					<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
					<span role="status" class="ms-2">Loading</span>
				</div>
			</button>

		</section>
	</Form>
</template>

<script setup>
import { Field, Form } from 'vee-validate'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '@/config/Firebase'
import { computed, ref } from 'vue'
import { emailValidate } from '@/services/validatios/auth'
import { successAlert } from '@/services/AlertServices'
import errorMessages from '@/helpers/errorMessages'
import successMessages from '@/helpers/successMessages'

// Computed --------------------------
const schema = computed(emailValidate)

// Emits -----------------------------
const emit = defineEmits(['close-modal', 'open-login']);

// Variables--------------------------
const loadSend = ref(false)
const errorBackend = ref(null)
const userSend = ref({ email: null })

// Method ---------------------------
const loginUser = async () => {
	try {
		loadSend.value = true
		const { email } = userSend.value
		await sendPasswordResetEmail(auth, email)
		await successAlert({ message: successMessages.sendEmail })
		closeModal()
	} catch (error) {
		console.error(error.code, error.message);
		errorBackend.value = errorMessages.loginError
	}
	loadSend.value = false
}

const clearErrorBackend = () => errorBackend.value = null
const closeModal = () => {
	emit('close-modal');
	emit('open-login');
}

</script>
