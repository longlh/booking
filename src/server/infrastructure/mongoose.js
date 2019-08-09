import mongoose from 'mongoose'

import config from '@/infrastructure/config'

mongoose.connect(config.mongodb, {
  promiseLibrary: Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}, (e) => {
  if (e) console.error(e)
})

export default mongoose
