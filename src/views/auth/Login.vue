<template>
	<div class="about">
		<h1>This is an about page</h1>
	</div>
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Method ---------------------------
const loginUser = async () => {
	try {
		loadSend.value = true
		const auth = getAuth();
		const { email, password } = userSend.value
		await signInWithEmailAndPassword(auth, email, password)
		await successAlert({ reload: true })
	} catch (error) {
		console.error(error.code, error.message);
	}
	loadSend.value = false
}
</script>