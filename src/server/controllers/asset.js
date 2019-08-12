import bodyParser from 'body-parser'
import objectPick from 'object.pick'

import Asset from '@/models/asset'

export default {
  create: [
    bodyParser.json(),
    async (req, res, next) => {
      const asset = new Asset({
        name: 'New Asset',
        description: 'This asset is newly created!',
        images: []
      })

      await asset.save()

      // const latestData = await Asset.findById(asset._id).populate('images')

      res.redirect(`/admin/assets/${asset._id}`)
    }
  ],
  update: [
    bodyParser.json(),
    async (req, res, next) => {
      const id = req.params.id

      await Asset.findByIdAndUpdate(id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        images: req.body.images
      })

      const latestData = await Asset.findById(id).populate('images')

      res.json(latestData)
    }
  ],
  publish: async (req, res, next) => {
    const id = req.params.id

    const asset = await Asset.findById(id).lean()

    await Asset.findByIdAndUpdate(id, {
      published: objectPick(asset, [
        'images',
        'name',
        'description',
        'price',
        'createdAt',
        'updatedAt'
      ])
    })

    return res.sendStatus(200)
  },
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
