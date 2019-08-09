import ect from 'ect'
import path from 'path'

import config from '@/infrastructure/config'

export default (app) => {
  const viewDir = path.join(config._root, '../resources/pages')

  const engine = ect({
    watch: config.devMode,
    root: viewDir,
    ext: '.ect'
  })

  app.set('view engine', 'ect')
  app.set('views', viewDir)
  app.engine('ect', engine.render)

  return app
}
