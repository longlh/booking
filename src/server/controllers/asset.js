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
        images: [],
        options: [],
        price: 0
      })

      await asset.save()

      res.redirect(`/admin/assets/${asset._id}`)
    }
  ],
  update: [
    bodyParser.json(),
    async (req, res, next) => {
      const id = req.params.id

      const asset = await Asset.findByIdAndUpdate(id, {
        name: req.body.name,
        excerpt: req.body.excerpt,
        description: req.body.description,
        price: req.body.price,
        images: req.body.images
      }, {
        w: 0,
        new: true
      })

      // populate images from array of _ids
      // const assetWithImages = await Asset.findById(id).populate('images')

      res.json(asset)
    }
  ],
  publish: async (req, res, next) => {
    const id = req.params.id
    const asset = await Asset.findById(id)

    asset.published = {
      ...asset.getValues(),
      hash: asset.hash
    }

    await asset.save()

    // populate images from array of _ids
    // const assetWithImages = await Asset.findById(id).populate('images')

    res.json(asset)
  },
  list: async (req, res, next) => {
    const assets = await Asset.find().lean()

    res.render('admin/asset-list', {
      assets
    })
  },
  view: async (req, res, next) => {
    const id = req.params.id

    const asset = await Asset.findById(id).lean()

    res.render('admin/asset-detail', {
      asset
    })
  }
}
