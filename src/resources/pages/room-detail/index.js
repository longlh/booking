window.$ = window.jQuery = require('jquery')
require('daterangepicker')
require('simplelightbox')
import { Stuck } from 'stuck-js'

;(function() {
  // stuck checkin/checkout date
  new Stuck([
    { selector: '.js-sticky', wrapper: '#section-contents' },
  ])

  // slider
  $('.room-thumbs a').simpleLightbox()

  // datepicker
  $('#checkin-date').daterangepicker({
    autoUpdateInput: false,
    locale: {
      cancelLabel: 'Reset'
    }
  })

  $('#checkin-date').on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'))

    $('#checkin-date-input').val(picker.startDate.valueOf())
    $('#checkout-date-input').val(picker.endDate.valueOf())
  })

  $('#checkin-date').on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('')
  })

  // show request booking in mobile
  $('#mobile-request-booking').click(function() {
    $('body').addClass('no-scroll')
    $('#room-reservation').addClass('mobile-open')
  })

  $('#reservation-widget-close').click(function() {
    $('body').removeClass('no-scroll')
    $('#room-reservation').removeClass('mobile-open')
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

      $('#traveler').val(number)
    })

    $counterDisplay.text(number)
  }

  counter()

  // submit form
  $('#reservation-form').submit(function(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const roomId = formData.get('roomId')
    const checkinDate = formData.get('checkin-date')
    const checkoutDate = formData.get('checkout-date')
    const traveler = formData.get('traveler')

    sessionStorage.setItem('BOOKING_ITEM', JSON.stringify({
      roomId,
      checkinDate,
      checkoutDate,
      traveler
    }))

    window.location = `/booking/${roomId}`
  })
})();
