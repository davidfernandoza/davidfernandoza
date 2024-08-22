<template>
	<BackendError :error="errorBackend" @close-alert-backend="clearErrorBackend">
	</BackendError>

	<Form @submit="updateUser" :validation-schema="schema" ref="form" v-show="!cropperOpen"
		:class="props.type == 'admin' ? 'row' : ''">

		<!-- Photo -->
		<div class="d-flex justify-content-center">

			<button type="button" class="btn btn-photo" @click="openFiles">
				<img :src="photoPreview ?? avatar" alt="Photo" width="150" height="150" class="img-thumbnail rounded-circle">
				<i class="fa-solid fa-pen btn btn-primary btn-photo__icon"></i>
			</button>

			<!-- Load Image -->
			<div class="d-none">
				<input type="file" id="file" @change="RefCropperImage.openCropperPhoto" accept="image/*">
			</div>
		</div>


		<!-- Full Name -->
		<div class="mb-2">
			<div>
				<label for="displayName" class="form-label">Full Name <small>(<span class="c-red">*</span>)</small></label>
				<Field name="displayName" v-slot="{ errorMessage, field }" v-model="userSend.displayName">
					<input type="text" id="displayName" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
						placeholder="EX: Jessie Velez" required title="Full Name Required" v-bind="field">
					<span class="invalid-feedback">{{ errorMessage }}</span>
				</Field>
			</div>
		</div>

		<!-- Countries -->
		<div class="mb-2">
			<label for="country" class="form-label">Country <small>(<span class="c-red">*</span>)</small></label>
			<Field name="country" v-slot="{ errorMessage, field }" v-model="userSend.country">
				<VSelect :options="countries" placeholder="EX: Colombia" :clearable="false" @option:selected="selectCountry"
					v-model="userSend.country" :class="`${errorMessage ? 'is-invalid' : ''}`" id="country"
					title="Country Required" v-bind="field">
					<template #search="{ attributes, events }">
						<input class="vs__search" :required="!userSend.country" v-bind="attributes" v-on="events" />
					</template>
				</VSelect>
				<span class="invalid-feedback">{{ errorMessage }}</span>
			</Field>
		</div>

		<!-- Phone -->
		<div :class="props.type == 'admin' ? '' : 'mb-3'">
			<label for="phone" class="form-label">Phone <small>(<span class="c-red">*</span>)</small></label>
			<Field name="phone" v-slot="{ errorMessage, field }" v-model="userSend.phone">
				<div class="input-group mb-3">
					<span class="input-group-text" title="Prefix Code Required">{{ userSend.prefixCode ?? '+00' }}</span>
					<input type="text" id="phone" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
						placeholder="EX: 300 000 0000" required title="Phone Required" v-bind="field" :disabled="!userSend.country">
					<span class="invalid-feedback">{{ errorMessage }}</span>
				</div>
			</Field>
		</div>

		<!-- Admin Section -->
		<section v-if="props.type == 'admin' && loadAdminInformation" class="col-12 row">
			<hr class="hr-text" data-content="Contacts">

			<!-- Github -->
			<div class="col-12">
				<label for="github" class="form-label">Github </label>
				<Field name="github" v-slot="{ errorMessage, field }" v-model="userSend.github">
					<div class="input-group mb-3">
						<span class="input-group-text" title="Github Link"><i class="fa-brands fa-github"></i></span>
						<input type="text" id="github"
							:class="`form-control ${errorMessage ? 'is-invalid' : copyFeedback.github ? 'is-valid' : ''}`"
							placeholder="https://github.com/my-username" title="Github Link" v-bind="field">
						<button v-if="userSend.github" type="button" class="input-group-text" title="Copy Github Link"
							@click="copyToClipboard(userSend.github, 'github')">
							<i class="fa-solid fa-copy"></i>
						</button>
						<a v-if="userSend.github" class="input-group-text" title="Goto Github" :href="userSend.github"
							target="_blank">
							<i class="fa-solid fa-person-walking-arrow-right"></i>
						</a>
						<span class="invalid-feedback">{{ errorMessage }}</span>
						<span class="valid-feedback">{{ copyFeedback.github }}</span>
					</div>
				</Field>
			</div>

			<!-- Linkedin -->
			<div class="col-12">
				<label for="linkedin" class="form-label">Linkedin</label>
				<Field name="linkedin" v-slot="{ errorMessage, field }" v-model="userSend.linkedin">
					<div class="input-group mb-3">
						<span class="input-group-text" title="Linkedin Link"><i class="fa-brands fa-linkedin"></i></span>
						<input type="text" id="linkedin"
							:class="`form-control ${errorMessage ? 'is-invalid' : copyFeedback.linkedin ? 'is-valid' : ''}`"
							placeholder="https://linkedin.com/my-username" title="Linkedin Link" v-bind="field">
						<button v-if="userSend.linkedin" type="button" class="input-group-text" title="Copy Linkedin Link"
							@click="copyToClipboard(userSend.linkedin, 'linkedin')">
							<i class="fa-solid fa-copy"></i>
						</button>
						<a v-if="userSend.linkedin" class="input-group-text" title="Goto Linkedin" :href="userSend.linkedin"
							target="_blank">
							<i class="fa-solid fa-person-walking-arrow-right"></i>
						</a>
						<span class="invalid-feedback">{{ errorMessage }}</span>
						<span class="valid-feedback">{{ copyFeedback.linkedin }}</span>
					</div>
				</Field>
			</div>


			<!-- Coriculum Vitae -->
			<div class="col-12">
				<label for="coriculumVitae" class="form-label">Coriculum Vitae</label>
				<div class="input-group mb-3">
					<span class="input-group-text" title="Coriculum Vitae File">
						<i class="fa-solid fa-file"></i>
					</span>
					<input type="file" id="coriculumVitae"
						:class="`form-control ${copyFeedback.curiculumVitae ? 'is-valid' : ''}`" accept=".pdf"
						@change="loadCoriculumVitae" title="Coriculum Vitae File">
					<button v-if="userSend.coriculumVitaeURL" type="button" class="input-group-text"
						@click="copyToClipboard(userSend.coriculumVitaeURL, 'curiculumVitae')" title="Copy Coriculum Vitae Link">
						<i class="fa-solid fa-copy"></i>
					</button>
					<a v-if="userSend.coriculumVitaeURL" class="input-group-text" title="Goto Coriculum Vitae"
						:href="userSend.coriculumVitaeURL" target="_blank">
						<i class="fa-solid fa-person-walking-arrow-right"></i>
					</a>
					<span class="valid-feedback">{{ copyFeedback.curiculumVitae }}</span>
				</div>
			</div>
		</section>

		<!-- Staiment -->
		<div class="mb-3 mt-3 d-flex justify-content-end">
			<div class="form-text">This symbol (<span class="c-red">*</span>) is means required
			</div>
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

	<!-- Cropper Image -->
	<section>
		<CropperImage ref="RefCropperImage" @cropper-open="(value) => cropperOpen = value" @canvas="handleCanvas"
			:withCircle="true">
		</CropperImage>
	</section>
</template>

<script setup>
import CropperImage from '@/app/components/CropperImage.vue'
import imageDefault from '@/helpers/ImagesDefaul.js'
import country from 'country-list-js';
import errorMessages from '@/helpers/errorMessages'
import { Field, Form } from 'vee-validate'
import { getAuth, updateProfile } from "firebase/auth";
import { successAlert } from '@/services/AlertServices';
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthUser } from '@/stores/auth.js'
import { profileValidate } from '@/app/schemas/ProfileValidate'
import { uploadFile } from '@/services/FileServices'
import { firestore } from "@/config/Firebase";
import { updateDoc, doc } from "firebase/firestore";
import { getOne } from '@/services/QueryService'



// Props ------------------------------
const props = defineProps(['type'])

//  Store Pinia -----------------------
const store = useAuthUser()
const { user } = storeToRefs(store)
const avatar = ref(user.value?.photoURL ?? imageDefault.avatar)


// Computed --------------------------
const schema = ref(profileValidate(user.value?.role))

// Emits -----------------------------
const emit = defineEmits(['close-modal'])

// Refs ------------------------------
const RefCropperImage = ref(null)


// Variables--------------------------
const loadSend = ref(false)
const photoPreview = ref(null)
const cropperOpen = ref(false)
const canvas = ref(null)
const userSend = ref({ ...user.value })
const countries = ref(country.names());
const errorBackend = ref(null)
const adminData = ref(null)
const coriculumVitae = ref(null)
const loadAdminInformation = ref(false)
const copyFeedback = ref({
	linkedin: null,
	curiculumVitae: null,
	github: null
})


// Methods ---------------------------
const updateUser = async () => {
	try {
		loadSend.value = true
		const auth = getAuth()
		const updateAsync = []
		if (canvas.value) {
			const url = await uploadFile(canvas.value, '/avatars', 'bin')
			userSend.value.photoURL = url
		}
		updateAsync.push(updateProfile(auth.currentUser, userSend.value))
		updateAsync.push(updateDoc(doc(firestore, "personalInformation", userSend.value.id),
			{
				phone: userSend.value.phone,
				country: userSend.value.country,
				prefixCode: userSend.value.prefixCode
			}))

		await Promise.all(updateAsync)
		if (props.type == 'admin') {
			await updateAdminInformation()
		}
		await successAlert({ reload: true })
	} catch (error) {
		console.error(error.code, error.message);
		errorBackend.value = errorMessages.inputProfile
	}
	loadSend.value = false
}

const updateAdminInformation = async () => {
	const objectToSend = {
		personalInformationID: user.value.id,
		github: userSend.value.github,
		linkedin: userSend.value.linkedin,
		prefixCode: userSend.value.prefixCode,
		phone: userSend.value.phone,
		country: userSend.value.country,
		email: userSend.value.email,
		photoURL: userSend.value.photoURL
	}

	if (coriculumVitae.value) {
		const url = await uploadFile(coriculumVitae.value, '/coriculum-vitae', 'file', 'CV-David-Fernando-Torres')
		objectToSend.coriculumVitaeURL = url
	}

	await updateDoc(doc(firestore, "adminInformation", userSend.value.adminInformationID), objectToSend)
}

const selectCountry = (name) => {
	const foundCountry = country.findByName(name);
	userSend.value.prefixCode = '+' + foundCountry.dialing_code
}

const getAdminInformation = async () => {
	if (props.type != 'admin') return
	loadAdminInformation.value = false
	const admin = await getOne({
		model: 'adminInformation',
		key: 'personalInformationID',
		value: user.value.id
	})
	userSend.value = {
		...user.value, ...{
			adminInformationID: admin.id,
			linkedin: admin.linkedin,
			github: admin.github,
			coriculumVitaeURL: admin.coriculumVitaeURL,
		}
	}
	loadAdminInformation.value = true
}

const copyToClipboard = (value, feedbackName) => {
	navigator.clipboard.writeText(value)
	copyFeedback.value[feedbackName] = 'Copy to clipboard!'
	setTimeout(() => copyFeedback.value[feedbackName] = null, 3000)
}

// Handlers -----------------------------

const loadCoriculumVitae = async (event) => {
	coriculumVitae.value = event.target.files[0]
}
const openFiles = () => {
	document.getElementById('file').click();
};

const handleCanvas = (value) => {
	photoPreview.value = value.toDataURL()
	canvas.value = value
}

const clearErrorBackend = () => errorBackend.value = null
const closeModal = () => emit('close-modal');


// Calls in Created-------------------------------

getAdminInformation()

</script>
