window.$ = window.jQuery = require('jquery')
require('daterangepicker')
import { Stuck } from 'stuck-js'

;(function() {
  // stuck checkin/checkout date
  new Stuck([
    { selector: '.js-sticky', wrapper: '#section-contents' },
  ])

  // datepicker
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

  // counter
  const counter = () => {
    const $counterDisplay = $('#counter-display')
    const $travelerNumber = $('#traveler-number')
    const $travelerText = $('#traveler-text')
    const $travelerControl = $('#traveler-control')
    let number = 1

    $('#counter-decreasement').addClass('disabled')

    $('#traveler-input').click(function() {
      if ($travelerControl.hasClass('open')) {
        $travelerControl.removeClass('open')
      } else {
        $travelerControl.addClass('open')
      }
    })

    $('#counter-increasement').click(function() {
      if (number < 5) {
        number += 1

        $counterDisplay.text(number)

        if (number === 5) {
          this.classList.add('disabled')
        } else {
          this.classList.remove('disabled')
        }
      } else {
        this.classList.add('disabled')
      }
    })

    $('#counter-decreasement').click(function() {
      if (number > 1) {
        number -= 1

        $counterDisplay.text(number)

        if (number === 1) {
          this.classList.add('disabled')
        } else {
          this.classList.remove('disabled')
        }
      } else {
        this.classList.add('disabled')
      }
    })

    $('#counter-apply').click(function() {
      $travelerNumber.text(number);

      if (number > 1) {
        $travelerText.text('travelers')
      } else {
        $travelerText.text('traveler')
      }

      $travelerControl.removeClass('open')
    })

    $counterDisplay.text(number)
  }

  counter()
})();
