<template>
	<div v-if="Object.entries(errors).length > 0" role="alert"
		class="alert alert-danger alert-dismissible fade show mx-2 my-2" id="alert-backend">
		<ul>
			<li v-for="(error, index) in errors" :key="index">
				{{ error }}
			</li>
		</ul>
		<button type="button" class="btn-close" @click="closeAlert"></button>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps(['errors'])
const errors = ref({})

watch(() => props.errors, (newErrors, oldErrors) => {
	errors.value = newErrors
})

const closeAlert = () => {
	const alertBackend = document.getElementById('alert-backend')
	const bsAlert = new bootstrap.Alert(alertBackend)
	bsAlert.close()
	errors.value = {}
};
</script>