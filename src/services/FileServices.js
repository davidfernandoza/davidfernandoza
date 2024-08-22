import { v4 } from 'uuid'
import { storage } from '@/config/Firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const uploadFile = async (file, folder, type, name = null) => {
	let data = file
	if (type == 'bin') {
		data = await new Promise(resolve => file.toBlob(blob => resolve(blob)))
	}
	const storageRef = ref(storage, `${folder}/${name ? name : v4()}`)
	await uploadBytes(storageRef, data)
	return await getDownloadURL(storageRef)
}
