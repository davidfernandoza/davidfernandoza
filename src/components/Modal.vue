<template>
	<!-- Modal -->
	<div class="modal fade" :id="id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
		:aria-labelledby="`${id}Label`" aria-hidden="true">
		<div :class="`modal-dialog modal-${size_validate}`">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" :id="`${id}Label`">
						{{ title_validate ?? '' }}
					</h5>
					<button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<slot v-if="load_content"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

/*
OPTIONS:
	'id',
	'title',
	'size'
*/
const props = defineProps(['options'])
const { id, size } = props.options

const modal = ref(null)
const title_validate = ref(null)
const size_validate = ref(size ?? '')
const load_content = ref(false)


// Wachers -----------------------------------
watch(() => props.options.title, (newTitle, oldTitle) => {
	title_validate.value = newTitle
}, { deep: true });


onMounted(() => {
	modal.value = new bootstrap.Modal(document.getElementById(id))
})

const openModal = () => {
	load_content.value = true
	modal.value.show()
}

const closeModal = () => {
	modal.value.hide()
	load_content.value = false
}


defineExpose({ openModal, closeModal });
</script>
