import getSettings from './middlewares/get-settings'

export default {
  view: [
    getSettings,
    (req, res, next) => {
      res.render('contact')
    }
  ]
}
