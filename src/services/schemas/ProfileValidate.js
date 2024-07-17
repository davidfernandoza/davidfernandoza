import * as yup from 'yup'
export const profileValidate = () =>
	yup.object({
		displayName: yup.string().required().min(5).label('"Full Name"'),
		phone: yup.number().required().integer().positive().min(4).label('"Phone"'),
		country: yup.string().required().label('"Country"')
	})
