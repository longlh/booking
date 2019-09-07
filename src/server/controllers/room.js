import Asset from '@/models/asset'

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
  ]
}
