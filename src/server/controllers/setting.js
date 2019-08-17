export default {
  view: async (req, res, next) => {
    res.render('admin/setting')
  },
  update: async (req, res, next) => {
    res.sendStatus(200)
  }
}
