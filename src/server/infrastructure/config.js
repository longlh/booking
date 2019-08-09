import path from 'path'

const rootDir = path.join(__dirname, '..')

export default {
  _root: rootDir,
  devMode: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  mongodb: process.env.MONGODB,
  assetEndpoint: process.env.ASSET_ENDPOINT
}
