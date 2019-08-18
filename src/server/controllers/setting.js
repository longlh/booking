import bodyParser from 'body-parser'

import Setting from '@/models/setting'

export default {
  view: async (req, res, next) => {
    const settingFields = await Setting.find({})

    const settings = settingFields.reduce(
      (merged, { name, value }) => ({
        ...merged,
        [name]: value
      }),
      {}
    )

    res.render('admin/settings', {
      settings
    })
  },
  update: [
    bodyParser.json(),
    async (req, res, next) => {
      const { name } = req.params
      const { value } = req.body

      const setting = await Setting.findOneAndUpdate({
        name
      }, {
        name,
        value
      }, {
        new: true,
        upsert: true
      })

      res.json(setting)
    }
  ]
}
