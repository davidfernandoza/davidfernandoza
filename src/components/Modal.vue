<template>
	<!-- Modal -->
	<div class="modal fade" :id="modal_id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
		:aria-labelledby="`${modal_id}Label`" aria-hidden="true">
		<div :class="`modal-dialog modal-${size_validate}`">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" :id="`${modal_id}Label`">
						{{ title ?? '' }}
					</h5>
					<button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
				</div>
				<form @submit.prevent="sendData" v-if="!without_form_validate">
					<div class="modal-body">
						<slot name="slot" :set-ref="sendData"></slot>
					</div>
					<div class="modal-footer" v-if="!without_footer_validate">
						<button type="button" class="btn btn-secondary" @click="closeModal">
							Cancel
						</button>
						<button type="sumbit" class="btn btn-primary">Send</button>
					</div>
				</form>
				<section v-else>
					<slot></slot>
				</section>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps([
	'modal_id',
	'title',
	'without_form',
	'without_footer',
	'size'
])
const { modal_id, title, without_form, without_footer, size } = props
const without_form_validate = without_form ?? false
const without_footer_validate = without_footer ?? false
const size_validate = size ?? ''
const modal = ref(null)
const slot = ref(null)

onMounted(() => {
	modal.value = new bootstrap.Modal(document.getElementById(modal_id))
})

const openModal = () => {
	modal.value.show()
}

const closeModal = () => {
	modal.value.hide()
}

const sendData = () => {
	console.log(slot.value)
}

defineExpose({ openModal });
</script>
