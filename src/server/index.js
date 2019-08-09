import createExpressServer from '@/express-server'
import config from '@/infrastructure/config'

const main = async () => {
  const app = await createExpressServer()

  app.listen(config.port, () => {
    console.log(`Server started at: ${config.port}`)
  })
}

main()
