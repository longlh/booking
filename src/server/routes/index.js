import * as controllers from '@/controllers'

export default {
  '/': {
    get: controllers.home.view
  },
  '/rooms': {
    get: controllers.room.list
  },
  '/rooms/:id': {
    get: controllers.room.view
  },
  '/contact': {
    get: controllers.contact.view
  },
  '/booking/:id': {
    get: controllers.booking.view,
    post: controllers.booking.request
  },
  '/booking/:id/success': {
    get: controllers.booking.success
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
  },
  '/admin/options': {
    get: controllers.option.list,
    post: controllers.option.create
  },
  '/admin/options/:id': {
    put: controllers.option.update,
    delete: controllers.option.remove
  },
  '/admin/settings': {
    get: controllers.setting.view
  },
  '/admin/settings/:name': {
    post: controllers.setting.update
  }
}
