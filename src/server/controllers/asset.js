import bodyParser from 'body-parser'

import Asset from '@/models/asset'

export default {
  create: [
    bodyParser.json(),
    async (req, res, next) => {
      console.log('xxx')

      const asset = new Asset({
        name: req.body.name,
        description: req.body.description,
        images: (req.body.images || []).map(i => i._id)
      })

      await asset.save()

      const latestData = await Asset.findById(asset._id).populate('images')

      res.json(latestData)
    }
  ]
}
