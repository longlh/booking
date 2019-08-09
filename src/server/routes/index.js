export default {
  '/': {
    get: (req, res, next) => {
      res.render('lp/view.ect')
    }
  }
}
