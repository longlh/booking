import formidable from 'formidable'
import fs from 'fs-extra'
import path from 'path'

import config from '@/infrastructure/config'

export default {
  upload: async (req, res, next) => {
    const form = formidable.IncomingForm()

    const today = new Date()
    const storeDir = path.resolve(config._root, '../../data/upload', today.getFullYear().toString(), (today.getMonth() + 1).toString())

    await fs.ensureDir(storeDir)

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return next(err)
      }

      const filename = fields.name.toLowerCase()
      const chunk = parseInt(fields.chunk, 10)
      const chunks = parseInt(fields.chunks, 10)
      const tempPath = files.file.path


      const rs = fs.createReadStream(tempPath)
      const ws = fs.createWriteStream(path.join(storeDir, filename), { flags: 'a' })

      ws.on('close', () => {
        fs.unlink(tempPath)

        if (chunk < chunks - 1) {
          // not finish
          return res.sendStatus(200)
        }

        // TODO store image info into database
        return res.sendStatus(201)
      })

      ws.on('error', (err) => next(err))

      rs.pipe(ws)
    })
  }
}
