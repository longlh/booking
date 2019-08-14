import * as controllers from '@/controllers'

export default {
  '/': {
    get: (req, res, next) => {
      res.render('home')
    }
  },
  '/rooms': {
    get: (req, res, next) => {
      res.render('rooms')
    }
  },
  '/rooms/:id': {
    get: (req, res, next) => {
      res.render('room-detail')
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
  '/admin/assets/:id/publish': {
    post: controllers.asset.publish
  },
  '/admin/images': {
    post: controllers.image.upload
  }
}
