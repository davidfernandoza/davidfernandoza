import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'
import 'datatables.net-bs5'
import 'datatables.net-buttons/js/buttons.html5.mjs'
import Buttons from 'datatables.net-buttons-bs5'

import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

DataTable.use(DataTablesCore)
DataTable.use(Buttons)
export default DataTable
