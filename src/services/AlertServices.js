import Swal from 'sweetalert2'

export const successAlert = async ({
	message = null,
	title = null,
	reload = false
}) => {
	await Swal.fire({
		title: title ?? 'Saved Successfully!',
		text: message ?? '',
		icon: 'success'
	})
	if (reload) window.document.reload()
}
