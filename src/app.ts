import * as express from 'express'
import * as Auth from './routes/Auth'
// import * as listEndpoints from 'express-list-endpoints'

export default function Load(app: express.Application) {
  app.get('/', function (_req, res) {
    res.send('hello world')
  })

  const router = express.Router()
  app.use('/api/v1', router)
  Auth.Route(app, router)
  // console.log(listEndpoints(app as any))
}
