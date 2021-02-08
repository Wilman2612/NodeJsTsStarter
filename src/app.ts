import express from 'express'
import configAuth from 'lib/passport'
import * as User from 'routes/User'
import cookieParser from 'cookie-parser'
import i18next from 'lib/i18next'
import * as swagger from 'lib/swagger'
import * as Auth from './routes/Auth'
import './@types'
import errormiddleware from './middlewares/errormiddleware'

export default function Load(app: express.Application) {
  app.get('/', function (_req, res) {
    res.send('hello world')
  })
  swagger.config(app)
  app.use(i18next())

  const router = express.Router()
  app.use('/api/v1', router)
  app.use(cookieParser())

  configAuth(app)
  Auth.Route(router)
  User.Route(router)

  app.use(errormiddleware)
}
