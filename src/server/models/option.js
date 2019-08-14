import mongoose from '@/infrastructure/mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Option', schema)
