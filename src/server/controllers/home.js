import Asset from '@/models/asset'

import getSettings from './middlewares/get-settings'

export default {
  view: [
    getSettings,
    async (req, res, next) => {
      const assets = await Asset.find({
        published: {
          $ne: null
        }
      })

      res.locals.assets = assets.map(asset => ({
        id: asset._id,
        ...asset.published
      }))

      next()
    },
    (req, res, next) => {
      res.render('home')
    }
  ]
}
