import routes from '@/routes'

const safeController = (controller) => {
  if (Array.isArray(controller)) {
    return controller.map(safeController)
  }

  return async (req, res, next) => {
    try {
      return await controller(req, res, next)
    } catch (e) {
      console.error(e)

      next(e)
    }
  }
}

export default (app) => {
  // common middlewares here


  // dynamically load controllers from @/routes
  Object.entries(routes).forEach(
    ([ path, methodMappings ]) => {
      Object.entries(methodMappings).forEach(
        ([ method, controller ]) => {
          if (!(app[method] instanceof Function)) {
            console.log(`cannot use ${method} on ${path}`)
            return
          }

          app[method](path, safeController(controller))
        }
      )
    }
  )

  return routes
}
