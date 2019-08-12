import mongoose from '@/infrastructure/mongoose'

const schema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Image', schema)
