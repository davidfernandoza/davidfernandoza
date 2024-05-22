import * as bootstrap from 'bootstrap'
import moment from 'moment'
import axios from 'axios'
import Swal from 'sweetalert2'
import '@fortawesome/fontawesome-free/js/all.js'

import jsZip from 'jszip'
window.JSZip = jsZip

window.Swal = Swal
window.axios = axios
window.moment = moment
window.bootstrap = bootstrap
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['Content-Type'] = 'application/json'
