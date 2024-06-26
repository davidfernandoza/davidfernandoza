import { defineStore } from 'pinia'

export const useAuthUser = defineStore('authUser', {
	state: () => {
		return {
			user: null
		}
	},
	actions: {
		addUserState(user) {
			this.user = user
		}
	}
})
