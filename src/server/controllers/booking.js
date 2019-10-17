import bodyParser from 'body-parser'
import dateFormat from 'date-format'

import Asset from '@/models/asset'
import Order from '@/models/order'

import sendMail from '@/services/mail'

import getSettings from './middlewares/get-settings'

import config from '@/infrastructure/config'

export default {
  view: [
    getSettings,
    async (req, res, next) => {
      const id = req.params.id

      const asset = await Asset.findById(id).lean()

      if (!asset) {
        res.redirect('/')
      }

      res.render('booking', {
        asset
      })
    }
  ],
  success: [
    getSettings,
    async (req, res, next) => {
      const id = req.params.id

      const order = await Order.findById(id).lean()

      if (!order) {
        res.redirect('/')
      }

      res.render('booking-success', {
        order
      })
    }
  ],
  request: [
    bodyParser.json(),
    async (req, res, next) => {
      const roomId = req.params.id
      const body = req.body
      const order = new Order({
        roomId,
        checkinDate: body.checkinDate,
        checkoutDate: body.checkoutDate,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        price: body.price,
        traveler: body.traveler
      })

      await order.save()

      const asset = await Asset.findById(roomId).lean()
      const name = `${body.firstName} ${body.lastName}`

      await sendMail({
        template: config.sendgrid.templates.bookingRequest,
        subject: `Confirmation Booking Request - ${asset.name} - Booking number ${order.bookingId}`,
        receiver: body.email,
        locals: {
          name,
          hotel: asset.name,
          address: asset.excerpt,
          bookingNumber: order.bookingId,
          checkin: dateFormat('yyyy/MM/dd', new Date(body.checkinDate)),
          checkout: dateFormat('yyyy/MM/dd', new Date(body.checkoutDate)),
          price: body.price || '¥10,752', // TODO remove hardcode
          roomType: 'Private room', // TODO remove hardcode
          travelerNumber: 2 // TODO remove hardcode
        }
      })

      res.json(order)
    }
  ]
}
