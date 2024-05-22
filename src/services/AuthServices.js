import axios from 'axios'
import moment from 'moment'

const initial_state = {
	api_token: null,
	user_id: null,
	site: null,
	expited_token: null
}

export const auth = {
	state: initial_state,

	getData() {
		const auth_data = JSON.parse(localStorage.getItem('auth_data'))
		if (auth_data) {
			this.state.api_token = auth_data.api_token
			this.state.user_id = parseInt(auth_data.user_id)
			this.state.site = auth_data.site
			this.state.expited_token = auth_data.expited_token
			this.state.user = auth_data.user
		} else this.state = initial_state
	},

	login(data) {
		data.expited_token = moment().add(1, 'h').unix()
		localStorage.setItem('auth_data', JSON.stringify(data))
		this.getData()
	},

	logout() {
		localStorage.removeItem('auth_data')
		this.getData()
	}
}

/*
 * Da permisos de autentiifcación a las rutas
 */
export const authMiddleware = (to, from, next) => {
	auth.getData()

	if (!auth.state.api_token) {
		/*
		 * Usuario no autentificado
		 */
		axios.defaults.headers.common['api-token'] = null
		if (to.path == '/login') return next()
		else return next({ name: 'login' })
	}

	if (to.path == '/login') {
		return next({ name: 'transportation' })
	}

	if (auth.state.expited_token > moment().unix()) {
		/*
		 * EL tiempo de expiración no ha caducado
		 */
		axios.defaults.headers.common['api-token'] = auth.state.api_token
		return next()
	}
	auth.logout()
	axios.defaults.headers.common['api-token'] = null
	return (window.location.href = '/')
}
