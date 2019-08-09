import formidable from 'formidable'
import fs from 'fs-extra'
import path from 'path'

import config from '@/infrastructure/config'
import Image from '@/models/image'

const generateStorePath = (filename) => {
  const today = new Date()

  return [
    today.getFullYear(),
    (today.getMonth() + 101).toString().substr(1, 2),
    filename
  ].join('/')
}

export default {
  upload: async (req, res, next) => {
    const form = formidable.IncomingForm()
    const storeDir = path.resolve(config._root, '../../data/upload')

    const assetId = req.params.id

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return next(err)
      }

      const filename = fields.name.toLowerCase()
      const chunk = parseInt(fields.chunk, 10)
      const chunks = parseInt(fields.chunks, 10)
      const tempPath = files.file.path
      const storePath = generateStorePath(filename)
      const writeLocation = path.join(storeDir, storePath)

      await fs.ensureDir(path.dirname(writeLocation))


      const rs = fs.createReadStream(tempPath)
      const ws = fs.createWriteStream(writeLocation, { flags: 'a' })

      ws.on('close', async () => {
        fs.unlink(tempPath)

        if (chunk < chunks - 1) {
          // not finish
          return res.sendStatus(200)
        }

        // TODO store image info into database
        const image = new Image({
          assetId,
          path: storePath
        })

        await image.save()

        return res.sendStatus(201)
      })

      ws.on('error', (err) => next(err))

      rs.pipe(ws)
    })
  }
}
