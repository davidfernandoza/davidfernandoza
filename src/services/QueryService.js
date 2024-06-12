'use strict'
import { firestore } from '@/config/Firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const getAll = async model => {
	return await getDocs(
		query(collection(firestore, model), where('deletedAt', '==', null))
	)
}
