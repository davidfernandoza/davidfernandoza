import * as yup from 'yup'

let profile = {
	displayName: yup.string().required().min(5).label('"Full Name"'),
	phone: yup.number().required().integer().positive().min(4).label('"Phone"'),
	country: yup.string().required().label('"Country"')
}

export const ProfileValidate = role => {
	if (role == 'admin') {
		profile = {
			...profile,
			likedink: yup.string().url().label('"Linkedin"'),
			github: yup.string().url().label('"Github"')
		}
	}
	return yup.object(profile)
}
