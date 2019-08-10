import bodyParser from 'body-parser'

import Asset from '@/models/asset'

export default {
  create: [
    bodyParser.json(),
    async (req, res, next) => {
      const asset = new Asset({
        name: req.body.name,
        description: req.body.description,
        images: (req.body.images || []).map(i => i._id)
      })

      await asset.save()

      const latestData = await Asset.findById(asset._id).populate('images')

      res.json(latestData)
    }
  ],
  update: [
    bodyParser.json(),
    async (req, res, next) => {
      const id = req.params.id

      await Asset.findByIdAndUpdate(id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
      })

      const latestData = await Asset.findById(id).populate('images')

      res.json(latestData)
    }
  ],
  list: async (req, res, next) => {
    const assets = await Asset.find().populate('images')

    res.render('admin/asset-list', {
      assets
    })
  },
  view: async (req, res, next) => {
    const id = req.params.id

    const asset = await Asset.findById(id).populate('images')

    res.render('admin/asset-detail', {
      asset
    })
  }
}
