import express from 'express'

const main = async () => {
  const app = express()

  app.listen(4000, () => {
    console.log(`App started at :4000`)
  })
}

main()
