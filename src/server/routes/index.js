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
  }
}
