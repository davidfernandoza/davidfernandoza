<template>
	<!-- Cropper Photo -->
	<Modal :options="optionsModalCropper" ref="modalCropperRef">
		<div class="w-100 d-flex justify-content-center my-4">
			<cropper v-if="withCircle" class="cropper" :src="originalPhoto" @change="changeCropper" :auto-zoom="true"
				:stencil-component="CircleStencil" :stencil-props="optionsCropper" />

			<cropper v-else class="cropper" :src="originalPhoto" @change="changeCropper" :auto-zoom="true"
				:stencil-props="optionsCropper" />
		</div>

		<!-- Footer -->
		<section class="d-flex justify-content-end my-3 me-4">
			<button type="button" class="btn btn-secondary mx-1" @click="closeModalCropper">Cancel
			</button>
			<button type="button" class="btn btn-primary me-2" @click="selectCropper"><span>Select Image</span></button>
		</section>
	</Modal>
</template>

<script setup>

import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import { ref } from 'vue'

// Props ----------------------------
const props = defineProps(['ratioWidth', 'ratioHeight', 'withCircle'])
const { ratioWidth, ratioHeight, withCircle } = props

// Emits -----------------------------
const emit = defineEmits(['image-preview', 'cropper-open', 'canvas'])

// Variables--------------------------
const originalPhoto = ref(null)
const canva = ref(null)
const ratioWidthValidate = ratioWidth ?? 10
const ratioHeightValidate = ratioHeight ?? 10

// Modal -----------------------------
const modalCropperRef = ref(null)
const optionsModalCropper = ref({
	id: 'cropperModal',
	have_heard: false
})
const optionsCropper = ref({ aspectRatio: ratioWidthValidate / ratioHeightValidate })

// Cropper Photo ---------------------

const openCropperPhoto = (envent) => {
	const fileSelected = envent.target.files[0]
	originalPhoto.value = URL.createObjectURL(fileSelected)
	modalCropperRef.value.openModal();
	cropperOpen(true)
};

const changeCropper = async ({ canvas }) => {
	canva.value = canvas
}

const selectCropper = () => {
	canvas(canva.value)
	closeModalCropper()
}

const closeModalCropper = () => {
	originalPhoto.value = null
	modalCropperRef.value.closeModal()
	document.getElementById('file').value = ''
	cropperOpen(false)
}

const cropperOpen = (value) => emit('cropper-open', value);
const canvas = (value) => emit('canvas', value);

defineExpose({ openCropperPhoto });

</script>