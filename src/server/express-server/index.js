import express from 'express'
import slash from 'express-slash'
import morgan from 'morgan'

import initRoutes from './routing'
import initViewEngine from './view-engine'

export default async () => {
  const app = express()

  app.enable('strict routing')
  app.enable('trust proxy')
  app.disable('x-powered-by')

  app.use(morgan('dev'))
  app.use(slash())

  await initRoutes(app)
  await initViewEngine(app)

  return app
}
