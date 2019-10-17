import path from 'path'

const rootDir = path.join(__dirname, '..')

export default {
  _root: rootDir,
  devMode: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  mongodb: process.env.MONGODB,
  assetEndpoint: process.env.ASSET_ENDPOINT,
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    sender: process.env.SENDGRID_SENDER,
    version: process.env.SENDGRID_VERSION,
    templates: {
      bookingRequest: process.env.SENDGRID_REQUEST_BOOKING_TEMPLATE
    }
  }
}
