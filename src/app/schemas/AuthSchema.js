import * as yup from 'yup'

const auth = {
	email: yup.string().email().required().label('"Email"'),
	password: yup.string().min(8).label('"Password"')
}

const passwordConfirmation = (ref, fild) => {
	return yup
		.string()
		.oneOf(
			[yup.ref(ref)],
			`"Password Confirmation" doesn't match with "${fild}"`
		)
		.label('"Password Confirmation"')
}

export const loginValidate = () => yup.object(auth)

export const registerValidate = () =>
	yup.object({
		email: auth.email,
		password: auth.password.required(),
		passwordConfirmation: passwordConfirmation(
			'password',
			'Password'
		).required()
	})

export const emailValidate = () =>
	yup.object({
		email: auth.email
	})
export const securityValidate = () =>
	yup.object({
		email: auth.email,
		actualPassword: auth.password.required().label('"Actual Password"'),
		newPassword: auth.password.label('"New Password"').nullable(),
		passwordConfirmation: passwordConfirmation(
			'newPassword',
			'New Password'
		).nullable()
	})
