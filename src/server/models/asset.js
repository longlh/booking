import hash from '@emotion/hash'
import objectPick from 'object.pick'

import mongoose from '@/infrastructure/mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
  },
  description: {
    type: String
  },
  images: [{
    type: String
  } ],
  price: {
    type: Number
  },
  published: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  hash: {
    type: String,
    default: function() {
      return hash(new Date().toISOString())
    }
  }
}, {
  timestamps: true
})

schema.methods.getValues = function () {
  return objectPick(this, [
    'name',
    'excerpt',
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
