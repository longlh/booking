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
  '/admin/assets/:id': {
    get: (req, res, next) => {
      res.render('admin/asset-detail')
    }
  },
  '/admin/assets/:id/images': {
    post: controllers.image.upload
  }
}
