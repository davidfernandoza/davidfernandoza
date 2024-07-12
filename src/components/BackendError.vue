<template>
	<div v-if="error" role="alert" class="alert alert-danger alert-dismissible fade show mt-1 mb-3"
		id="alert-backend">
		<h2 class="alert-heading h5"><i class="fa-solid fa-bug"></i>
			<span class="ms-2">Error!</span>
		</h2>
		<ul class="m-0 pb-0">
			<li>{{ error }}</li>
		</ul>
		<button type="button" class="btn-close" @click="closeAlert"></button>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Emits ------------------------
const emit = defineEmits(['close-alert-backend'])

// Props -------------------------
const props = defineProps(['error'])
const error = ref(null)
error.value = props.error

watch(() => props.error, (newErrors, oldErrors) => {
	error.value = newErrors
}, { deep: true });

const closeAlert = () => {
	const alertBackend = document.getElementById('alert-backend')
	const bsAlert = new bootstrap.Alert(alertBackend)
	bsAlert.close()
	error.value = null
	emit('close-alert-backend')
};



</script>