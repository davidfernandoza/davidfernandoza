import { v4 } from 'uuid'
import { storage } from '@/config/Firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const uploadFile = async (canvas, folder) => {
	const bin = await new Promise(resolve => canvas.toBlob(blob => resolve(blob)))
	const storageRef = ref(storage, `${folder}/${v4()}`)
	await uploadBytes(storageRef, bin)
	return await getDownloadURL(storageRef)
}
