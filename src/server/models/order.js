import hash from '@emotion/hash'

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
  },
  bookingId: {
    type: String,
    default: function() {
      return hash(new Date().toISOString()).toUpperCase()
    }
  }
}, {
  timestamps: true
})

export default mongoose.model('Order', schema)
