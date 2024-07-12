'use strict'
import { firestore } from '@/config/Firebase'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'

export const getOne = async ({ model, key, value }) => {
	let response = null
	const data = await getDocs(
		query(collection(firestore, model), where(key, '==', value), limit(1))
	)
	data.forEach(doc => {
		response = { id: doc.id, ...doc.data() }
	})
	return response
}

export const getAll = async ({ model, key, value }) => {
	let response = []
	const data = await getDocs(
		query(collection(firestore, model), where(key, '==', value), limit(1))
	)
	data.forEach(doc => {
		response.push({ id: doc.id, ...doc.data() })
	})
	return response
}
