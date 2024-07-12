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

		<!-- Countries -->
		<div class="mb-3">
			<label for="country" class="form-label">Country</label>
			<Field name="country" v-slot="{ errorMessage, field }" v-model="userSend.country">
				<VSelect :options="countries" placeholder="EX: Colombia" :clearable="false" v-model="userSend.country"
					:class="`${errorMessage ? 'is-invalid' : ''}`" id="country" title="Country Required" v-bind="field">
					<template #search="{ attributes, events }">
						<input class="vs__search" :required="!userSend.country" v-bind="attributes" v-on="events" />
					</template>
				</VSelect>
				<span class="invalid-feedback">{{ errorMessage }}</span>
			</Field>
		</div>

		<!-- Phone -->
		<div class="mb-3">
			<label for="phone" class="form-label">Phone</label>
			<Field name="phone" v-slot="{ errorMessage, field }" v-model="userSend.phone">
				<input type="text" id="phone" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
					placeholder="EX: 300 000 0000" required title="Phone Required" v-bind="field">
				<span class="invalid-feedback">{{ errorMessage }}</span>
			</Field>
		</div>

		<!-- Footer -->
		<section class="d-flex justify-content-end my-3 pt-3">
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
import imageDefault from '@/helpers/ImagesDefaul.js'
import country from 'country-list-js';
import { Field, Form } from 'vee-validate'
import { getAuth, updateProfile } from "firebase/auth";
import { successAlert } from '@/services/AlertServices';
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthUser } from '@/stores/auth.js'
import { profileValidate } from '@/services/validatios/auth'
import { uploadFile } from '@/services/FileServices'
import { firestore } from "@/config/Firebase";
import { updateDoc, doc } from "firebase/firestore";



//  Store Pinia -----------------------------

const store = useAuthUser()
const { user } = storeToRefs(store)
const avatar = ref(user.value?.photoURL ?? imageDefault.avatar)

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
const countries = ref(country.names());


// Methods ---------------------------
const updateUser = async () => {
	try {
		loadSend.value = true
		const auth = getAuth()
		const updateAsync = []
		if (canvas.value) {
			const url = await uploadFile(canvas.value, '/avatars')
			userSend.value.photoURL = url
		}
		updateAsync.push(updateProfile(auth.currentUser, userSend.value))
		updateAsync.push(updateDoc(doc(firestore, "personalInformation", userSend.value.id),
			{
				phone: userSend.value.phone,
				country: userSend.value.country
			}))
		await Promise.all(updateAsync)
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
