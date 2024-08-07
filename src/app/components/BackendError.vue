<template>
	<div v-if="error" role="alert"
		:class="`alert alert-${type == 'Error' ? 'danger' : 'warning'} alert-dismissible fade show mt-1 mb-3`"
		id="alert-backend">

		<h2 class="alert-heading h5" v-if="type == 'Error'">
			<i class="fa-solid fa-bug"></i>
			<span class="ms-2">Error!</span>
		</h2>

		<h2 class="alert-heading h5" v-else>
			<i class="fa-solid fa-circle-exclamation"></i>
			<span class="ms-2">Warning!</span>
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
const props = defineProps(['error', 'type'])
const error = ref(null)
const type = ref(null)
error.value = props.error
type.value = props.type ?? 'Error'

// Watch -------------------------
watch(() => props.error, (newErrors, oldErrors) => {
	error.value = newErrors
}, { deep: true });

watch(() => props.type, (newType, oldType) => {
	type.value = newType
}, { deep: true });

// Methods -----------------------
const closeAlert = () => {
	const alertBackend = document.getElementById('alert-backend')
	const bsAlert = new bootstrap.Alert(alertBackend)
	bsAlert.close()
	error.value = null
	emit('close-alert-backend')
};



</script>