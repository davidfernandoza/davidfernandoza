<template>
	<Form @submit="updateUser" :validation-schema="schema" ref="form">

		<!-- Photo -->
		<div class="mb-3 w-100 d-flex justify-content-center">
			<button type="button" @click="openFiles">
				<img :src="photoPreview ?? 'https://fakeimg.pl/150x150/'" alt="Photo" width="150" height="150"
					class="img-thumbnail">
			</button>

			<!-- Load Image -->
			<div class="d-none">
				<input type="file" id="file" accept="image/*" @change="previewPhoto">
			</div>

		</div>

		<div>
			<cropper class="cropper" :src="photoPreview ?? 'https://fakeimg.pl/150x150/'" @change="change"
				:stencil-props="{ aspectRatio: 10 / 10 }" />
		</div>

		<!-- Email -->
		<div class="mb-3">
			<label for="email" class="form-label">Email</label>
			<Field name="email" v-slot="{ errorMessage, field }" v-model="userSend.email">
				<input type="email" id="email" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
					placeholder="EX: example@email.com" required title="Email Required" v-bind="field">
				<span class="invalid-feedback">{{ errorMessage }}</span>
			</Field>
		</div>

		<!-- Full Name -->
		<div class="mb-3">
			<label for="displayName" class="form-label">Full Name</label>
			<Field name="displayName" v-slot="{ errorMessage, field }" v-model="userSend.displayName">
				<input type="text" id="displayName" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
					placeholder="EX: Maria Jose" required title="Full Name Required" v-bind="field">
				<span class="invalid-feedback">{{ errorMessage }}</span>
			</Field>
		</div>

		<!-- Phone-->
		<div class="mb-3">
			<label for="phoneNumber" class="form-label">Phone</label>
			<Field name="phoneNumber" v-slot="{ errorMessage, field }" v-model="userSend.phoneNumber">
				<input type="text" id="phoneNumber" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
					placeholder="EX: 310 000 0000" required title="Phone Required" v-bind="field">
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
import { Cropper } from 'vue-advanced-cropper'
import { Field, Form } from 'vee-validate'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { successAlert } from '@/services/AlertServices';
import { computed, ref } from 'vue'
import authValidate from '@/services/validatios/auth'
import { storeToRefs } from 'pinia'
import { useAuthUser } from '@/stores/auth.js'

const store = useAuthUser()
const { user } = storeToRefs(store)

// Computed --------------------------
const schema = computed(authValidate)

// Emits -----------------------------
const emit = defineEmits(['close-modal'])

// Variables--------------------------
const loadSend = ref(false)
const userSend = ref(user)
const photoPreview = ref(null)
const file = ref(null)

// Method ---------------------------
const updateUser = async () => {
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

const previewPhoto = (envent) => {
	file.value = envent.target.files[0]
	photoPreview.value = URL.createObjectURL(file.value)
};

const openFiles = () => {
	document.getElementById('file').click();
};


const change = ({ coordinates, canvas }) => {
	console.log(coordinates, canvas)
}

const closeModal = () => emit('close-modal');

</script>
