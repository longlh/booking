import ect from 'ect'
import path from 'path'

import config from '@/infrastructure/config'

const DEFAULT_VIEW = '/view.ect'

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

  app.use((req, res, next) => {
    const _render = res.render

    res.render = (view, locals, useDefault = true) => {
      if (!useDefault) {
        return _render.call(res, view, locals)
      }

      return _render.call(res, view + DEFAULT_VIEW, locals)
    }

    next()
  })

  return app
}
