import '@/scss/app.scss'
import '@/config/Bootstrap'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Router from '@/stores/router'
import App from '@/App.vue'
import BackendError from '@/components/BackendError.vue'
import Modal from '@/components/Modal.vue'
import DataTable from '@/config/DataTable'
import VSelect from 'vue-select'

const app = createApp(App)
app.use(Router)
app.use(createPinia())
app.component('VSelect', VSelect)
app.component('BackendError', BackendError)
app.component('Modal', Modal)
app.component('DataTable', DataTable)
app.mount('#app')
