import mongoose from '@/infrastructure/mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  images: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  } ],
  price: {
    type: Number
  },
  published: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
})

export default mongoose.model('Asset', schema)