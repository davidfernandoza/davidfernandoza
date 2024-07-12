import { defineStore } from 'pinia'

export const useLoadPage = defineStore('loadPage', {
	state: () => {
		return {
			loadPage: false
		}
	},
	actions: {
		addLoadPageState(state) {
			this.loadPage = state
		}
	}
})
