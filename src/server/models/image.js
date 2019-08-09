import mongoose from '@/infrastructure/mongoose'

const schema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  assetId: {
    type: String,
    required: true
  }
})

export default mongoose.model('Image', schema)
