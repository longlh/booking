import bodyParser from 'body-parser'

import Asset from '@/models/asset'
import Order from '@/models/order'

import getSettings from './middlewares/get-settings'

export default {
  list: [
    getSettings,
    async (req, res, next) => {
      const assets = await Asset.find()

      res.locals.assets = assets.map(asset => ({
        id: asset._id,
        ...asset.published
      }))

      next()
    },
    (req, res, next) => {
      res.render('rooms')
    }
  ],
  view: [
    getSettings,
    async (req, res, next) => {
      const id = req.params.id

      const asset = await Asset.findById(id).lean()

      if (!asset) {
        res.redirect('/')
      }

      console.log(asset)
      res.render('room-detail', {
        asset
      })
    }
  ],
  viewBooking: [
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
  requestBooking: [
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

      res.json(order)
    }
  ],
  bookingSuccess: [
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
  ]
}
