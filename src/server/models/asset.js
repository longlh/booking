import hash from '@emotion/hash'
import objectPick from 'object.pick'

import mongoose from '@/infrastructure/mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }],
  price: {
    type: Number
  },
  published: {
    type: mongoose.Schema.Types.Mixed
  },
  hash: {
    type: String
  }
}, {
  timestamps: true
})

schema.methods.getValues = function () {
  return objectPick(this, [
    'name',
    'description',
    'price',
    'images',
    'options'
  ])
}

schema.pre('findOneAndUpdate', function (next) {
  const assetValues = schema.methods.getValues.apply(this._update)

  // generate new hash
  this._update.hash = hash(JSON.stringify(assetValues, Object.keys(assetValues).sort()))

  next()
})

export default mongoose.model('Asset', schema)
