import * as yup from 'yup'

const auth = {
	email: yup.string().email().required().label('"Email"'),
	password: yup.string().min(8).label('"Password"')
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
		displayName: yup.string().min(5).label('"Full Name"')
	})
