import express from 'express'
import fs from 'fs-extra'
import path from 'path'

import config from '@/infrastructure/config'

export default async (app) => {
  const distDir = path.resolve(config._root, '../../data/dist')
  const manifest = await fs.readJson(path.join(distDir,'manifest.json'))

  app.locals.__asset = (file) => manifest[file]

  app.use('/assets', express.static(path.resolve(distDir, '/assets')))

  return app
}
