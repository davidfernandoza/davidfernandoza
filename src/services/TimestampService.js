import moment from 'moment'

export const createTime = object_send => {
	object_send.value.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
	object_send.value.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
	return object_send.value
}
export const updateTime = object_send => {
	object_send.value.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
	return object_send.value
}
