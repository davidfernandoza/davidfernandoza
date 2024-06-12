import Swal from '~/sweetalert2/src/sweetalert2.js'

const swal = Swal.mixin({
	customClass: {
		confirmButton: 'btn btn-primary mx-1 py-2 px-3',
		cancelButton: 'btn btn-secondary mx-1 py-2 px-3'
	},
	buttonsStyling: false
})

export const successAlert = async ({
	message = null,
	title = null,
	reload = false
}) => {
	await swal.fire({
		title: title ?? 'Saved Successfully!',
		text: message ?? '',
		icon: 'success'
	})
	if (reload) window.location.reload()
}

export const deleteStatementAlert = async () => {
	const { isConfirmed } = await swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		showCancelButton: true,
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'No, cancel!',
		icon: 'warning'
	})
	return isConfirmed
}
