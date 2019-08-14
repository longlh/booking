import bodyParser from 'body-parser'

import Option from '@/models/option'

export default {
  list: async (req, res, next) => {
    const options = await Option.find({})

    return res.render('admin/option-list', { options })
  },
  create: [
    async (req, res, next) => {
      const option = new Option({
        name: 'New option'
      })

      await option.save()

      // return res.status(201).json(option)
      return res.redirect('/admin/options')
    }
  ],
  update: [
    bodyParser.json(),
    async (req, res, next) => {
      const id = req.params.id

      const option = await Option.findByIdAndUpdate(id, {
        name: req.body.name
      }, {
        new: true
      })

      return res.json(option)
    }
  ],
  remove: async (req, res, next) => {
    const id = req.params.id

    await Option.remove({ id })

    res.sendStatus(204)
  }
}
