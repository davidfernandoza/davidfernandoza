<template>
	<BackendError :error="errorBackend" @close-alert-backend="clearErrorBackend">
	</BackendError>

	<Form @submit="sendEmail" :validation-schema="schema" ref="form">
		<!-- Email -->
		<div class="mb-2">
			<label for="email" class="form-label">Email <small>(<span class="c-red">*</span>)</small></label>
			<Field name="email" v-slot="{ errorMessage, field }" v-model="userSend.email">
				<input type="email" id="email" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`" required
					placeholder="EX: example@email.com" title="Email Required" v-bind="field">
				<span class="invalid-feedback">{{ errorMessage }}</span>
			</Field>
		</div>

		<!-- Recaptcha -->
		<Recaptcha ref="RefRecaptcha"></Recaptcha>

		<!-- Staiment -->
		<div class="mb-3 mt-2 d-flex justify-content-end">
			<div class="form-text">This symbol (<span class="c-red">*</span>) is means required
			</div>
		</div>

		<!-- Footer -->
		<section class="d-flex justify-content-end">
			<button type="button" class="btn btn-secondary mx-1 px-2" @click="closeModal" v-if="!loadSend"> Cancel
			</button>
			<button type="sumbit" class="btn btn-primary" :disabled="loadSend">
				<span v-if="!loadSend">Send</span>
				<div v-else>
					<LoadComponentLayout type="button" />
				</div>
			</button>
		</section>
	</Form>
</template>

<script setup>
import errorMessages from '@/helpers/errorMessages'
import successMessages from '@/helpers/successMessages'
import Recaptcha from '@/app/components/Recaptcha.vue'
import { Field, Form } from 'vee-validate'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '@/config/Firebase'
import { computed, ref } from 'vue'
import { emailValidate } from '@/app/schemas/AuthValidate'
import { successAlert } from '@/services/AlertServices'
import LoadComponentLayout from '@/app/views/layouts/LoadComponentLayout.vue'

// Ref -------------------------------
const RefRecaptcha = ref(null)

// Computed --------------------------
const schema = computed(emailValidate)

// Emits -----------------------------
const emit = defineEmits(['close-modal', 'open-login']);

// Variables--------------------------
const loadSend = ref(false)
const errorBackend = ref(null)
const userSend = ref({ email: null })


// Method ---------------------------
const sendEmail = async () => {
	try {
		if (!RefRecaptcha.value.getValidate()) {
			errorBackend.value = errorMessages.recaptcha
			return
		}
		loadSend.value = true
		const { email } = userSend.value
		await sendPasswordResetEmail(auth, email)
		await successAlert({ title: 'Email sent', message: successMessages.sendEmail })
		closeModal()
	} catch (error) {
		console.error(error.code, error.message);
		errorBackend.value = errorMessages.emailForgot
	}
	loadSend.value = false
}


const clearErrorBackend = () => errorBackend.value = null
const closeModal = () => {
	emit('close-modal');
	emit('open-login');
}

</script>
@/app/AlertServices@/app/schemas/AuthValidate