<template>

	<div v-if="props?.type == 'button'" class="d-flex justify-content-center align-items-center">
		<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
		<span role="status" class="ms-2">Loading...</span>
	</div>
	<div class="text-center py-4" v-else>
		<div class="spinner-border" role="status">
			<span class="visually-hidden"></span>
		</div>
		<p class="mt-1">Loading...</p>
	</div>
</template>

<script setup>
const props = defineProps(['type']);

</script>