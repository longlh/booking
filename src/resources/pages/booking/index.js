import dateFormat from 'date-format'
import request from 'superagent'

const form = document.getElementById('booking-form')
const order = JSON.parse(sessionStorage.getItem('BOOKING_ITEM') || '{}')

if (!order.checkinDate || !order.checkoutDate) {
  window.location = '/'
}

window.addEventListener('load', (event) => {
  const checkinDate = document.getElementById('checkin-date-input')
  const checkoutDate = document.getElementById('checkout-date-input')
  const traveler = document.getElementById('traveler-input')
  const contentCheckin = document.getElementById('content-checkin')
  const contentCheckout = document.getElementById('content-checkout')
  const contentTraveler = document.getElementById('content-traveler')

  checkinDate.value = order.checkinDate
  checkoutDate.value = order.checkoutDate
  traveler.value = order.traveler
  contentCheckin.innerHTML = dateFormat('yyyy/MM/dd', new Date(order.checkinDate))
  contentCheckout.innerHTML = dateFormat('yyyy/MM/dd', new Date(order.checkoutDate))
  contentTraveler.innerHTML = order.traveler
})

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const bookingBtn = document.getElementById('booking-btn')
  const formData = new FormData(event.target)
  const roomId = formData.get('roomId')
  const checkinDate = formData.get('checkinDate')
  const checkoutDate = formData.get('checkoutDate')
  const traveler = formData.get('traveler')
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const email = formData.get('email')

  bookingBtn.setAttribute('disabled', 'disabled')

  try {
    const { body: order } = await request.post(`/booking/${roomId}`)
      .send({
        roomId,
        checkinDate,
        checkoutDate,
        traveler,
        firstName,
        lastName,
        email
      })

    sessionStorage.removeItem('BOOKING_ITEM')

    window.location = `/booking/${order._id}/success`
  } catch (e) {
    console.log(e)
    bookingBtn.removeAttribute('disabled')
  }
})
