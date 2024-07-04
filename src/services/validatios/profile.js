import * as yup from 'yup'
export default () =>
	yup.object({
		displayName: yup.string().min(5).label('Full Name')
	})
