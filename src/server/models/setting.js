import mongoose from '@/infrastructure/mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
})

export default mongoose.model('Setting', schema)
