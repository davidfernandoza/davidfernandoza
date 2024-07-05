<template>
	<Form @submit="updateUser" :validation-schema="schema" ref="form" v-show="!cropperOpen">

		<!-- Photo -->
		<div class="w-100 d-flex justify-content-center">

			<button type="button" class="btn btn-photo" @click="openFiles">
				<img :src="photoPreview ?? avatar" alt="Photo" width="150" height="150" class="img-thumbnail rounded-circle">
				<i class="fa-solid fa-pen btn btn-primary btn-photo__icon"></i>
			</button>

			<!-- Load Image -->
			<div class="d-none">
				<input type="file" id="file" @change="cropperImage.openCropperPhoto" accept="image/*">
			</div>
		</div>


		<!-- Full Name -->
		<div class="mb-3">
			<label for="displayName" class="form-label">Full Name</label>
			<Field name="displayName" v-slot="{ errorMessage, field }" v-model="userSend.displayName">
				<input type="text" id="displayName" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
					placeholder="EX: Jessie Velez" required title="Full Name Required" v-bind="field">
				<span class="invalid-feedback">{{ errorMessage }}</span>
			</Field>
		</div>


		<!-- Footer -->
		<section class="d-flex justify-content-end mb-3">
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

	<!-- Cropper Image -->
	<section>
		<CropperImage ref="cropperImage" @cropper-open="(value) => cropperOpen = value" @canvas="handleCanvas"
			:withCircle="true">
		</CropperImage>
	</section>

</template>

<script setup>
import CropperImage from '@/components/CropperImage.vue'
import { Field, Form } from 'vee-validate'
import { getAuth, updateProfile } from "firebase/auth";
import { successAlert } from '@/services/AlertServices';
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthUser } from '@/stores/auth.js'
import { profileValidate } from '@/services/validatios/auth'
import { uploadFile } from '@/services/FileServices'
import imageDefault from '@/helpers/ImagesDefaul.js'


//  Store Pinia -----------------------------

const store = useAuthUser()
const { user } = storeToRefs(store)
const avatar = ref(user.value.photoURL ?? imageDefault.avatar)

// Computed --------------------------

const schema = computed(profileValidate)

// Emits -----------------------------

const emit = defineEmits(['close-modal'])

// Components ------------------------

const cropperImage = ref(null)

// Variables--------------------------
const loadSend = ref(false)
const photoPreview = ref(null)
const cropperOpen = ref(false)
const canvas = ref(null)
const userSend = ref({ ...user.value })


// Methods ---------------------------
const updateUser = async () => {
	try {
		loadSend.value = true
		const auth = getAuth()
		if (canvas.value) {
			const url = await uploadFile(canvas.value, '/avatars')
			userSend.value.photoURL = url
		}
		await updateProfile(auth.currentUser, userSend.value)
		await successAlert({ reload: true })
	} catch (error) {
		console.error(error.code, error.message);
	}
	loadSend.value = false
}

// Handlers -----------------------------

const openFiles = () => {
	document.getElementById('file').click();
};

const handleCanvas = (value) => {
	photoPreview.value = value.toDataURL()
	canvas.value = value
}

const closeModal = () => emit('close-modal');

</script>
