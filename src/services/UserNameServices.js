export const getUsername = user => {
	if (user.displayName) {
		const nameArray = user.displayName.split(' ')
		return `${nameArray[0]} ${
			nameArray[2] ? nameArray[2] : nameArray[1] ? nameArray[1] : ''
		}`
	}
	const emailArray = user.email.split('@')
	return emailArray[0]
}
