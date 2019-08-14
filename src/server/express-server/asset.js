import express from 'express'
import fs from 'fs-extra'
import path from 'path'

import config from '@/infrastructure/config'

export default async (app) => {
  const distDir = path.resolve(config._root, '../../data/dist')
  const assetDir = path.resolve(distDir, '/assets')
  const libDir = path.resolve(config._root, '../../node_modules')
  const manifestPath = path.join(distDir,'manifest.json')

  app.use('/assets', express.static(assetDir))
  app.use('/libs', express.static(libDir))

  const manifest = await fs.readJson(manifestPath)
  app.locals.__asset = (file) => manifest[file]

  // handle uploaded images
  app.use('/upload', express.static(path.join(config._root, '../../data/upload')))

  return app
}
