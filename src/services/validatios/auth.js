import * as yup from 'yup'

const auth = {
	email: yup.string().email().required().label('"Email"'),
	password: yup.string().required().min(8).label('"Password"')
}

export const registerValidate = () =>
	yup.object({
		...auth,
		passwordConfirmation: yup
			.string()
			.required()
			.oneOf(
				[yup.ref('password')],
				`"Password Confirmation" doesn't match with "Password"`
			)
			.label('"Password Confirmation"')
	})

export const loginValidate = () => yup.object(auth)

export const profileValidate = () =>
	yup.object({
		displayName: yup.string().required().min(5).label('"Full Name"'),
		phone: yup.number().required().integer().positive().min(4).label('"Phone"'),
		country: yup.string().required().label('"Country"')
	})
export const emailValidate = () =>
	yup.object({
		email: auth.email
	})
