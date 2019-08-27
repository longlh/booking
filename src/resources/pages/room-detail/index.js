window.$ = window.jQuery = require('jquery')
require('daterangepicker')
import { Stuck } from 'stuck-js'

new Stuck([
  { selector: '.js-sticky', wrapper: '#section-contents' },
])

$('#checkin-date').daterangepicker({
  autoUpdateInput: false,
  locale: {
    cancelLabel: 'Reset'
  }
})

$('#checkin-date').on('apply.daterangepicker', function(ev, picker) {
  $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'))
})

$('#checkin-date').on('cancel.daterangepicker', function(ev, picker) {
  $(this).val('')
})
