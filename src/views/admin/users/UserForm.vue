<template>
	<form @submit.prevent="storageUser">

		<!-- Full Name -->
		<div class="mb-3">
			<label for="full_name" class="form-label">Full Name <small>(<span class="c-red">*</span>)</small></label>
			<input type="text" class="form-control" v-model="user_send.full_name" id="full_name"
				placeholder="EX: Dario Camargo" required title="Full Name Required">
		</div>

		<!-- Email -->
		<div class="mb-3">
			<label for="email" class="form-label">Email <small>(<span class="c-red">*</span>)</small></label>
			<input type="email" class="form-control" v-model="user_send.email" id="email"
				placeholder="EX: dario-camargo@email.com" required title="Email Required">
		</div>

		<!-- Password -->
		<div class="mb-3">
			<label for="password" class="form-label">Password <small>(<span class="c-red">*</span>)</small></label>
			<input type="password" class="form-control" v-model="user_send.password" id="password" placeholder="EX: ********"
				required title="Password Required">
		</div>

		<!-- Phone -->
		<div class="mb-3">
			<label for="phone" class="form-label">Phone <small>(<span class="c-red">*</span>)</small></label>
			<input type="number" step="any" class="form-control" v-model="user_send.phone" id="phone"
				placeholder="EX: 000 000 0000" required title="Phone Required">
		</div>

		<!-- Country -->
		<div class="mb-3">
			<label for="country" class="form-label">Country <small>(<span class="c-red">*</span>)</small></label>
			<VSelect :options="countries" placeholder="Select One" :clearable="false" v-model="user_send.country" id="country"
				title="Country Required">
				<template #search="{ attributes, events }">
					<input class="vs__search" :required="!user_send.country" v-bind="attributes" v-on="events" />
				</template>
			</VSelect>
		</div>

		<!-- Role -->
		<div class="mb-3">
			<label for="role" class="form-label">Role <small>(<span class="c-red">*</span>)</small></label>
			<VSelect :options="roles" placeholder="Select One" :clearable="false" v-model="user_send.role" id="role"
				title="Role Required">
				<template #search="{ attributes, events }">
					<input class="vs__search" :required="!user_send.role" v-bind="attributes" v-on="events" />
				</template>
			</VSelect>
		</div>

		<!-- Staiment -->
		<div class="mt-5 d-flex justify-content-end">
			<div class="form-text">This symbol (<span class="c-red">*</span>) is means required
			</div>
		</div>

		<!-- Footer -->
		<section class="modal-footer mb-0 p-0 pt-3">
			<button type="button" class="btn btn-secondary" @click="closeModal" :disabled="load_send"> Cancel
			</button>
			<button type="sumbit" class="btn btn-primary" :disabled="load_send">
				<span v-if="!load_send">Send</span>
				<div v-else>
					<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
					<span role="status" class="ms-2">Loading...</span>
				</div>
			</button>
		</section>
	</form>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "@/config/Firebase";
import { createTime } from "@/services/TimestampService";
import { successAlert } from '@/services/AlertServices'
import { ref } from 'vue'
import country from 'country-list-js';


const emit = defineEmits(['close-modal', 'reload-table'])
const countries = ref(country.names());
const load_send = ref(false)
const roles = ref(['Admin', 'User', 'Company']);
const user_send = ref({
	auth_id: null,
	full_name: null,
	email: null,
	password: null,
	phone: null,
	country: null,
	role: null,
	created_at: null,
	updated_at: null
})

const storageUser = async () => {
	load_send.value = true
	const response = await created()
	if (response) {
		await successAlert({})
		reloadTable()
	}
	load_send.value = false


};

const created = async () => {
	try {
		const auth = getAuth();
		const { email, password } = user_send.value
		const { user } = await createUserWithEmailAndPassword(auth, email, password)
		delete user_send.value.password
		user_send.value.auth_id = user.uid
		user_send.value = createTime(user_send)
		await addDoc(collection(firestore, 'users'), user_send.value);
		return true
	} catch (error) {
		console.error(error.code, error.message);
		return false
	}
}
const update = async () => {

}

const reloadTable = () => {
	emit('reload-table')
	closeModal()
}
const closeModal = () => emit('close-modal')

</script>
