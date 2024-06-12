import moment from 'moment'

export const createTime = objectSend => {
	objectSend.value.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
	objectSend.value.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
	return objectSend.value
}
export const updateTime = objectSend => {
	objectSend.value.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
	return objectSend.value
}
export const deleteTime = objectSend => {
	objectSend.deletedAt = moment().format('YYYY-MM-DD HH:mm:ss')
	return objectSend
}
