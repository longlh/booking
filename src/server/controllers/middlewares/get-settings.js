import Setting from '@/models/setting'

export default async (req, res, next) => {
  const settingFields = await Setting.find({})

  const settings = settingFields.reduce(
    (merged, { name, value }) => ({
      ...merged,
      [name]: value
    }),
    {}
  )

  res.locals.settings = settings

  next()
}
