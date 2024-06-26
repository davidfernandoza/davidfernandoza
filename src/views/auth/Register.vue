<template>
	<Form @submit="registerUser" :validation-schema="schema" ref="form">

		<!-- Email -->
		<div class="mb-3">
			<label for="email" class="form-label">Email</label>
			<Field name="email" v-slot="{ errorMessage, field }" v-model="userSend.email">
				<input type="email" id="email" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
					placeholder="EX: example@email.com" required title="Email Required" v-bind="field">
				<span class="invalid-feedback">{{ errorMessage }}</span>
			</Field>
		</div>

		<!-- Password -->
		<div class="mb-4">
			<label for="password" class="form-label">Password </label>
			<Field name="password" v-slot="{ errorMessage, field }" v-model="userSend.password">
				<input type="password" id="password" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
					placeholder="EX: ********" required title="Password Required" v-bind="field">
				<span class="invalid-feedback">{{ errorMessage }}</span>
			</Field>
		</div>

		<!-- Footer -->
		<section class="d-flex justify-content-end">
			<button type="button" class="btn btn-secondary mx-1" @click="closeModal" :disabled="loadSend"> Cancel
			</button>
			<button type="sumbit" class="btn btn-primary" :disabled="loadSend">
				<span v-if="!loadSend">Send</span>
				<div v-else>
					<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
					<span role="status" class="ms-2">Loading...</span>
				</div>
			</button>
		</section>
	</Form>
</template>

<script setup>
import { Field, Form } from 'vee-validate'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { successAlert } from '@/services/AlertServices';
import { computed, ref } from 'vue'
import authValidate from '@/services/validatios/auth'

// Computed --------------------------
const schema = computed(authValidate)

// Emits -----------------------------
const emit = defineEmits(['close-modal'])

// Variables--------------------------
const loadSend = ref(false)
const userSend = ref({
	email: null,
	password: null,
})

// Method ---------------------------
const registerUser = async () => {
	try {
		loadSend.value = true
		const auth = getAuth();
		const { email, password } = userSend.value
		await createUserWithEmailAndPassword(auth, email, password)
		await successAlert({ reload: true })
	} catch (error) {
		console.error(error.code, error.message);
	}
	loadSend.value = false
}

const closeModal = () => emit('close-modal');

</script>
