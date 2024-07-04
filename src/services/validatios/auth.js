import * as yup from 'yup'
export default () =>
	yup.object({
		email: yup.string().email().required().label('Email'),
		password: yup.string().min(8).label('Password')
	})
