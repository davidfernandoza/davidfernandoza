<template>
	<BackendError :error="errorBackend" @close-alert-backend="clearErrorBackend" :type="errorType">
	</BackendError>

	<Form @submit="updateCredentials" :validation-schema="schema" ref="form">

		<!-- Email -->
		<div class="mb-3">
			<label for="email" class="form-label">Email <small>(<span class="c-red">*</span>)</small></label>
			<Field name="email" v-slot="{ errorMessage, field }" v-model="userSend.email">
				<div class="input-group">
					<!-- Input -->
					<input type="email" id="email" :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
						placeholder="EX: email@example.com" required title="Email Required" v-bind="field" :disabled="!changeEmail">

					<!-- Show Password -->
					<button class="btn btn-outline-secondary show-button" type="button" @click="handlerChangeEmail">
						<span v-show="changeEmail">
							<i class="fa-solid fa-ban" title="Cancel Edit Email"></i>
						</span>
						<span v-show="!changeEmail">
							<i class="fa-solid fa-pencil" title="Edit Email"></i>
						</span>
					</button>
					<span class="invalid-feedback">{{ errorMessage }}</span>
				</div>
			</Field>
		</div>

		<!-- Actual Password -->
		<div class="mb-2">
			<label for="actualPassword" class="form-label">Actual Password <small>(<span
						class="c-red">*</span>)</small></label>
			<Field name="actualPassword" v-slot="{ errorMessage, field }" v-model="userSend.actualPassword">
				<div class="input-group">
					<!-- Input -->
					<input :type="showActualPassword ? 'text' : 'password'" id="actualPassword"
						:class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
						:placeholder="!showActualPassword ? 'EX: ********' : 'EX: asecR3t*'" required
						title="Actual Password Required" v-bind="field">

					<!-- Show Password -->
					<button class="btn btn-outline-secondary show-button" type="button"
						@click="() => showActualPassword = !showActualPassword">
						<span v-show="showActualPassword">
							<i class="fa-solid fa-eye-slash" title="Hide Actual Password"></i>
						</span>
						<span v-show="!showActualPassword">
							<i class="fa-solid fa-eye" title="Show Actual Password"></i>
						</span>
					</button>
					<span class="invalid-feedback">{{ errorMessage }}</span>
				</div>
			</Field>
		</div>

		<!-- Recaptcha -->
		<Recaptcha ref="RefRecaptcha" v-if="changeEmail"></Recaptcha>


		<!-- New Password -->
		<section v-if="userSend.emailVerified">
			<hr class="hr-text" data-content="Change Password">

			<div class="mb-3">
				<label for="newPassword" class="form-label">New Password </label>
				<Field name="newPassword" v-slot="{ errorMessage, field }" v-model="userSend.password">
					<div class="input-group">
						<!-- Input -->
						<input :type="showPassword ? 'text' : 'password'" id="newPassword"
							:class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
							:placeholder="!showPassword ? 'EX: ********' : 'EX: asecR3t*'" required title="New Password"
							v-bind="field">

						<!-- Show Password -->
						<button class="btn btn-outline-secondary show-button" type="button"
							@click="() => showPassword = !showPassword">
							<span v-show="showPassword">
								<i class="fa-solid fa-eye-slash" title="Hide New Password"></i>
							</span>
							<span v-show="!showPassword">
								<i class="fa-solid fa-eye" title="Show New Password"></i>
							</span>
						</button>
						<span class="invalid-feedback">{{ errorMessage }}</span>
					</div>
				</Field>
			</div>

			<!-- Password Confirm -->
			<div class="mb-3">
				<label for="passwordConfirmation" class="form-label">
					Password Confirmation </label>
				<Field name="passwordConfirmation" v-slot="{ errorMessage, field }" v-model="userSend.passwordConfirmation">
					<div class="input-group">
						<!-- Input -->
						<input :type="showPassword ? 'text' : 'password'" id="passwordConfirmation"
							:class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
							:placeholder="!showPassword ? 'EX: ********' : 'EX: asecR3t*'" required title="Confirm Password"
							v-bind="field">

						<!-- Show Password -->
						<button class="btn btn-outline-secondary show-button" type="button"
							@click="() => showPassword = !showPassword">
							<span v-show="showPassword">
								<i class="fa-solid fa-eye-slash" title="Hide Password Confirmation"></i>
							</span>
							<span v-show="!showPassword">
								<i class="fa-solid fa-eye" title="Show Password Confirmation"></i>
							</span>
						</button>
						<span class="invalid-feedback">{{ errorMessage }}</span>
					</div>
				</Field>
			</div>
		</section>

		<!-- Staiment -->
		<div class="mb-3 mt-3 d-flex justify-content-end">
			<div class="form-text">This symbol (<span class="c-red">*</span>) is means required
			</div>
		</div>

		<!-- Footer -->
		<section class="d-flex justify-content-end">
			<button type="button" class="btn btn-secondary ms-1 px-2" @click="closeModal" v-if="!loadSend"> Cancel
			</button>
			<button type="button" class="btn btn-dark ms-1 px-2" @click="resendEmail(false)"
				:disabled="loadSend || secontsForShow" v-if="!userSend.emailVerified">
				<span v-if="!loadSend">{{ secontsForShow ? getMessageForResend(true) : getMessageForResend() }}</span>
				<div v-else>
					<LoadComponentLayout type="button" />
				</div>
			</button>
			<button type="sumbit" class="btn btn-primary ms-1" :disabled="loadSend">
				<span v-if="!loadSend">Send</span>
				<div v-else>
					<LoadComponentLayout type="button" />
				</div>
			</button>

		</section>
	</Form>
</template>

<script setup>
import errorMessages from '@/helpers/errorMessages'
import successMessages from '@/helpers/successMessages'
import Recaptcha from '@/app/components/Recaptcha.vue'
import LoadComponentLayout from '@/app/views/layouts/LoadComponentLayout.vue'
import { Field, Form } from 'vee-validate'
import { successAlert } from '@/services/AlertServices'
import { computed, ref } from 'vue'
import { securityValidate } from '@/app/schemas/AuthSchema'
import { storeToRefs } from 'pinia'
import { useAuthUser } from '@/stores/auth.js'
import {
	setInLocalStorage,
	getFromLocalStorage,
	removeFromLocalStorage
} from '@/services/LocalStorage'
import {
	getAuth,
	updateEmail,
	updatePassword,
	reauthenticateWithCredential,
	EmailAuthProvider,
	sendEmailVerification
} from "firebase/auth"

// Ref -------------------------------
const RefRecaptcha = ref(null)

// Store -----------------------------
const store = useAuthUser()
const { user } = storeToRefs(store)

// Computed --------------------------
const schema = computed(securityValidate)

// Emits -----------------------------
const emit = defineEmits(['close-modal'])

// Variables--------------------------
const loadSend = ref(false)
const showPassword = ref(false)
const showActualPassword = ref(false)
const changeEmail = ref(false)
const errorBackend = ref(null)
const errorType = ref('Error')
const secontsForShow = ref(null)
const userSend = ref({
	...user.value,
	password: null,
	passwordConfirmation: null,
})
const findString = ref(`${userSend.value.uid}_time`)

// Method ---------------------------
const updateCredentials = async () => {
	try {
		if (!userSend.value.password && !changeEmail.value) {
			errorType.value = 'Info'
			errorBackend.value = errorMessages.notChageInfo
			return
		}
		loadSend.value = true
		const auth = getAuth();
		const udpadeData = []

		const credentials = EmailAuthProvider.credential(
			auth.currentUser.email,
			userSend.value.actualPassword
		);
		await reauthenticateWithCredential(auth.currentUser, credentials)
		if (changeEmail.value) {

			// Recaptcha
			if (!RefRecaptcha.value.getValidate()) {
				errorBackend.value = errorMessages.recaptcha
				loadSend.value = false
				return
			}
			udpadeData.push(updateEmail(auth.currentUser, userSend.value.email))
		}
		if (userSend.value.password) {
			udpadeData.push(updatePassword(auth.currentUser, userSend.value.password))
			userSend.value.actualPassword = userSend.value.password
		}
		await Promise.all(udpadeData)
		if (changeEmail.value) {
			handlerTime(true)
			return await resendEmail(true)
		}
		await successAlert({ reload: false, title: 'Password updated!' })
		closeModal()
	} catch (error) {
		console.error(error.code, error.message);
		errorType.value = 'Error'
		if (error.code === 'auth/wrong-password') {
			errorBackend.value = errorMessages.ActualPasswordError
		} else if (error.code === 'auth/too-many-requests Firebase') {
			errorBackend.value = errorMessages.loginManyRequests
		} else {
			errorBackend.value = errorMessages.errorSecurity
		}
	}
	loadSend.value = false
}

const resendEmail = async (reload) => {
	try {
		loadSend.value = true
		const auth = getAuth();
		await sendEmailVerification(auth.currentUser)
		await successAlert({
			reload: reload,
			title: reload ? 'Email updated!' : 'Email sent!',
			message: successMessages.registerSuccess
		})
		handlerTime(true)
	} catch (error) {
		console.error(error.code, error.message);
		errorType.value = 'Error'
		errorBackend.value = errorMessages.registerError
	}
	loadSend.value = false
}

const getMessageForResend = (inCount = false) => {
	const message = 'Resend email verification'
	return inCount ? `${message} in ${secontsForShow.value} sec` : message
}

// Handlers --------------------------
const handlerChangeEmail = () => {
	changeEmail.value = !changeEmail.value
	userSend.value.email = user.value.email
}

const handlerTime = (create = false) => {
	if (!getFromLocalStorage(findString.value)) {
		if (!create) return
		const date = moment().add(1, 'minutes').format('YYYY-MM-DD HH:mm:ss')
		setInLocalStorage(findString.value, { limitTime: date })
	}
	return callEachSecond()
}

const callEachSecond = () => {
	const now = moment()
	const data = getFromLocalStorage(findString.value)
	if (!data?.limitTime) return
	const { limitTime } = data
	const milliseconds = (moment(limitTime) - now)
	secontsForShow.value = Math.floor(milliseconds / 1000)
	if (now >= moment(limitTime)) {
		removeFromLocalStorage(findString.value)
		secontsForShow.value = null
		return
	}
	return setTimeout(callEachSecond, 1000)
}

const clearErrorBackend = () => {
	errorBackend.value = null
	errorType.value = 'Error'
}
const closeModal = () => emit('close-modal');

// Calls in create component --------------------
handlerTime();

</script>
@/app/AlertServices@/app/schemas/AuthSchema@/app/schemas/AuthSchema