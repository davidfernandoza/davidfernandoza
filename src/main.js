import '@/app/styles/scss/app.scss'
import '@/config/Bootstrap'
import Pinia from '@/stores/index.js'
import { createApp } from 'vue'

import Router from '@/router'
import App from '@/app/App.vue'
import BackendError from '@/app/components/BackendError.vue'
import Modal from '@/app/components/Modal.vue'
import DataTable from '@/config/DataTable'
import VSelect from 'vue-select'
import VueRecaptcha from 'vue3-recaptcha2'

const app = createApp(App)

app.use(Pinia)
app.use(Router)
app.component('VSelect', VSelect)
app.component('BackendError', BackendError)
app.component('Modal', Modal)
app.component('DataTable', DataTable)
app.component('VueRecaptcha', VueRecaptcha)

app.mount('#app')
