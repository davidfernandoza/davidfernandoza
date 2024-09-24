import * as yup from 'yup'

let skill = {
	name: yup.string().required().min(1).label('"Name"')
}

export const SkillValidate = () => {
	return yup.object(skill)
}
