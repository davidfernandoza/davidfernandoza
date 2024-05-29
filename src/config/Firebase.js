const env = import.meta.env

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Initialize Firebase
const firebaseConfig = {
	apiKey: env.VITE_FR_API_KEY,
	authDomain: env.VITE_FR_AUTH_DOMAIN,
	projectId: env.VITE_FR_PROJECT_ID,
	storageBucket: env.VITE_FR_STORAGE_BUCKET,
	messagingSenderId: env.VITE_FR_MESSAGING_SENDER_ID,
	appId: env.VITE_FR_APP_ID,
	measurementId: env.VITE_FR_MEASUREMENT_ID
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const analytics = getAnalytics(app)
export const firestore = getFirestore(app)
