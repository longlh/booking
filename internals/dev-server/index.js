import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from '../webpack.config.babel'

const app = express()
const PORT = 4001

const devServer = process.env.ASSET_ENDPOINT
const state = {
  isStarted: false
}

// init compiler & webpack stuffs
const compiler = webpack({
  ...config,
  // override with development configuration
  mode: 'development',
  // inject webpack-hot-middleware
  entry: Object.entries(config.entry).reduce(
    (entry, [ key, value ]) => ({
      ...entry,
      [key]: [
        ...value,
        `webpack-hot-middleware/client?reload=true&path=${devServer}/__hmr`
      ]
    }),
   {}
  ),
  plugins: [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin()
  ]
})

// handle ping
app.get('/alive', (req, res) => res.sendStatus(204))

app.use(
  // common stuffs
  morgan('dev'),
  cors(),
  // webpack middlewares
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    watchOption: {
      ignore: /node_modules/
    }
  }),
  webpackHotMiddleware(compiler, {
    path: '/__hmr'
  })
)

// start dev-server when bundling finishes
compiler.hooks.emit.tap('done', () => {
  if (state.isStarted) {
    return
  }

  app.listen(PORT, () => {
    state.isStarted = true

    console.log(`dev-server started at: ${PORT}`)
  })
})
