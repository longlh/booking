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

  // handle uploaded images
  app.use('/upload', express.static(path.join(config._root, '../../data/upload')))

  return app
}
