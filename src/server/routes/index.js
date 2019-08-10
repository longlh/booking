import * as controllers from '@/controllers'

export default {
  '/': {
    get: (req, res, next) => {
      res.render('lp')
    }
  },
  '/admin': {
    get: (req, res, next) => {
      res.render('admin/dashboard')
    }
  },
  '/admin/assets': {
    get: controllers.asset.list,
    post: controllers.asset.create
  },
  '/admin/assets/:id': {
    get: controllers.asset.view,
    post: controllers.asset.update
  },
  '/admin/images': {
    post: controllers.image.upload
  }
}
