import mongoose from '@/infrastructure/mongoose'

const schema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset'
  },
  checkinDate: {
    type: Date
  },
  checkoutDate: {
    type: Date
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  price: {
    type: Number
  },
  traveler: {
    type: Number
  }
}, {
  timestamps: true
})

export default mongoose.model('Order', schema)
