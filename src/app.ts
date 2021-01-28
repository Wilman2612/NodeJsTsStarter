import * as express from 'express'
import configAuth from 'libs/passport'
import * as User from 'routes/User'
import * as Auth from './routes/Auth'

export default function Load(app: express.Application) {
  app.get('/', function (_req, res) {
    res.send('hello world')
  })
  app.get('/helloworld', function (_req, res) {
    res.send('hello world')
  })

  const router = express.Router()
  app.use('/api/v1', router)

  configAuth(app)
  Auth.Route(router)
  User.Route(router)
}
