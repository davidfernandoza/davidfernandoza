'use strict'
import { storeToRefs, setActivePinia, createPinia } from 'pinia'
import { useAuthUser } from '@/stores/auth.js'

const pinia = createPinia()
setActivePinia(pinia)

const store = useAuthUser()
const { user } = storeToRefs(store)
console.log(user)
export default user
