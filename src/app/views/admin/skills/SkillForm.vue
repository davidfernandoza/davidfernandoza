<template>
	<section>
		<BackendError :error="errorBackend" @close-alert-backend="clearErrorBackend">
		</BackendError>

		<Form @submit="sendSkill" :validation-schema="schema" ref="form" v-show="!cropperOpen">

			<article class="row">
				<section class="col-12">

					<!-- Photo -->
					<div class="d-flex justify-content-center">

						<button type="button" class="btn btn-photo" @click="openFiles">
							<img :src="photoPreview ?? photo" alt=" Photo" width="150" height="150" class="img-thumbnail">
							<i class="fa-solid fa-pen btn btn-secondary btn-photo__icon--square"></i>
						</button>

						<!-- Load Image -->
						<div class="d-none">
							<input type="file" id="file" @change="RefCropperImage.openCropperPhoto" accept="image/*">
						</div>
					</div>


					<!-- Name -->
					<div class="mb-2">
						<div>
							<label for="name" class="form-label">Name <small>(<span class="c-red">*</span>)</small></label>
							<Field name="name" v-slot="{ errorMessage, field }" v-model="skill.name">
								<input type="text" id="name" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
									placeholder="EX: JavaScript" required title="Name Required" v-bind="field">
								<span class="invalid-feedback">{{ errorMessage }}</span>
							</Field>
						</div>
					</div>
				</section>
			</article>

			<!-- Staiment -->
			<div class="mb-3 mt-3 d-flex justify-content-end">
				<div class="form-text">This symbol (<span class="c-red">*</span>) is means required
				</div>
			</div>

			<!-- Footer -->
			<section class="d-flex justify-content-end">
				<button type="button" class="btn btn-secondary mx-1" @click="closeModal" v-if="!loadSend"> Cancel
				</button>
				<button type="sumbit" class="btn btn-primary" :disabled="loadSend">
					<span v-if="!loadSend">Send</span>
					<div v-else>
						<LoadComponentLayout type="button" />
					</div>
				</button>
			</section>

		</Form>

		<!-- Cropper Image -->
		<section>
			<CropperImage ref="RefCropperImage" @cropper-open="(value) => cropperOpen = value" @canvas="handleCanvas"
				:withCircle="false">
			</CropperImage>
		</section>
	</section>
</template>

<script setup>
import CropperImage from '@/app/components/CropperImage.vue'
import imageDefault from '@/helpers/ImagesDefaul.js'
import errorMessages from '@/helpers/errorMessages'
import LoadComponentLayout from '@/app/views/layouts/LoadComponentLayout.vue'
import { SkillValidate } from '@/app/schemas/SkillSchema'
import { ref, computed } from 'vue';
import { Field, Form } from 'vee-validate'
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "@/config/Firebase"
import { SkillInformation } from '@/helpers/colectionNames'
import { collection, addDoc } from "firebase/firestore"
import { uploadFile } from '@/services/FileServices'
import { successAlert } from '@/services/AlertServices';

// Emits -------------------------------------------
const emit = defineEmits(['close-modal'])

// Props -------------------------------------------
const props = defineProps(['skill'])

// Schema ------------------------------------------
const schema = computed(SkillValidate)

// Refs --------------------------------------------
const RefCropperImage = ref({})

// Vars	--------------------------------------------
const cropperOpen = ref(false)
const photoPreview = ref(null)
const skill = ref({})
const canvas = ref(null)
const loadSend = ref(false)
const errorBackend = ref(null)
const isEdit = ref(false)


// Validations -------------------------------------
if (props.skill) {
	skill.value = props.skill
	isEdit.value = true
}

const photo = ref(skill.value?.imageURL ?? imageDefault.image)


// Methods -----------------------------------------
const openFiles = () => {
	document.getElementById('file').click();
}

const sendSkill = async () => {
	try {
		loadSend.value = true
		if (canvas.value) {
			const url = await uploadFile(canvas.value, '/skills', 'bin')
			skill.value.imageURL = url
		} else if (!isEdit.value) {
			alert('Please select a photo')
			loadSend.value = false
			return
		}

		if (isEdit.value) {
			await updateDoc(doc(firestore, SkillInformation, skill.value.id),
				{
					name: skill.value.name,
					imageURL: skill.value.imageURL
				})
			await successAlert({ reload: true, title: 'Updated successfully!' })
		} else {
			await addDoc(collection(firestore, SkillInformation), {
				name: skill.value.name,
				imageURL: skill.value.imageURL
			})
			await successAlert({ reload: true })
		}
	} catch (error) {
		console.error(error.code, error.message);
		errorBackend.value = errorMessages.inputProfile
	}
	loadSend.value = false

}

// Handlers ----------------------------------
const handleCanvas = (value) => {
	photoPreview.value = value.toDataURL()
	canvas.value = value
}

const clearErrorBackend = () => errorBackend.value = null
const closeModal = () => emit('close-modal');

</script>
