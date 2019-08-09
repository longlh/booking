import express from 'express'
import fs from 'fs-extra'
import path from 'path'

import config from '@/infrastructure/config'

export default async (app) => {
  const distDir = path.resolve(config._root, '../../data/dist')
  const assetDir = path.resolve(distDir, '/assets')
  const manifestPath = path.join(distDir,'manifest.json')

  app.use('/assets', express.static(assetDir))

  const manifest = await fs.readJson(manifestPath)
  app.locals.__asset = (file) => manifest[file]

  return app
}
