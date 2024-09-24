'use strict'
import pinia from '@/stores/index'
import { storeToRefs } from 'pinia'
import { useAuthUser } from '@/stores/auth.js'

export default (to, from, next) => {
	const store = useAuthUser(pinia)
	const { user } = storeToRefs(store)
	if (!user.value) return next({ name: 'home' })

	return next()
	auth.getData()
	if (auth.state.api_token) {
		/*
		 * Usuario logueado
		 */
		if (to.path == '/Login') {
			return next({ name: 'Home' })
		}
		/*
		 * Expiración de tiempo
		 */
		if (auth.state.expited_token > moment().unix()) {
			axios.defaults.headers.common['api-token'] = auth.state.api_token
			return next()
		}
		auth.logout()
		axios.defaults.headers.common['api-token'] = null
		return (window.location.href = '/')
	}
	axios.defaults.headers.common['api-token'] = null
	if (to.path == '/Login') return next()
	else return next({ name: 'Login' })
}
