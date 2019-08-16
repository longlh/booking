import Asset from '@/models/asset'

export default {
  view: [
    async (req, res, next) => {
      const assets = await Asset.find()

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
