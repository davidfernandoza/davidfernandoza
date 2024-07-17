<template>
	<!-- Recaptcha -->
	<div class="d-flex w-100 justify-content-start">
		<VueRecaptcha v-show="true" :sitekey="recaptchaSiteKey" theme="light" hl="en" :loading-timeout="loadingTimeoutError"
			@verify="recaptchaVerified" @expire="recaptchaExpired" @fail="recaptchaFailed" @error="recaptchaError"
			ref="RefRecaptcha">
		</VueRecaptcha>
	</div>
</template>

<script setup>
import { recaptchaSiteKey } from '@/config/Firebase'
import { ref } from 'vue'

// Computed --------------------------
const RefRecaptcha = ref(null)

// Emits -----------------------------
const emit = defineEmits(['validate-recaptcha']);

// Variables--------------------------

const loadingTimeoutError = ref(30000)
const validateRecaptcha = ref(null)


// Recaptcha --------------------------
const recaptchaVerified = (response) => {
	validateRecaptcha.value = response
}
const recaptchaExpired = () => {
	RefRecaptcha.value.reset();
	validateRecaptcha.value = null
	errorBackend.value = errorMessages.recaptchaExpired
}
const recaptchaFailed = () => {
	validateRecaptcha.value = null
	errorBackend.value = errorMessages.recaptchaInvalid
}
const recaptchaError = (reason) => {
	validateRecaptcha.value = null
	errorBackend.value = errorMessages.recaptchaInvalid
	console.error(reason)
}

const getValidate = () => {
	return validateRecaptcha.value
}

defineExpose({ getValidate });

</script>
