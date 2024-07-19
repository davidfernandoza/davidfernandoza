export const setInLocalStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data))
}

export const getFromLocalStorage = key => {
	return JSON.parse(localStorage.getItem(key))
}

export const removeFromLocalStorage = key => {
	localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
	localStorage.clear()
}