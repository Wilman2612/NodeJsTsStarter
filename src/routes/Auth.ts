import * as express from 'express'
import User from 'models/User'
import Users from 'src/services/Users'
import AccessToken from 'src/model/AccesToken'
import * as multer from 'multer'
import * as Encryption from 'libs/bcrypt'
import { AuthMiddleware, configAuth } from '../lib/passport'
import * as jwt from '../lib/jwt'

const timeout = '1h'

export function Route(app: express.Application, root: express.Router) {
  configAuth(app)
  const users = new Users()

  const router = express.Router()
  root.use('/auth', router)
  const upload = multer()
  router.post(
    '/login',
    upload.none(),
    AuthMiddleware,
    function (_req: express.Request, res: express.Response) {
      // const jsonToken: AccessToken = { usr: req.user! as string, ip: req.connection.remoteAddress! }
      // const token = jwt.generateToken(jsonToken, timeout)
      console.log('message', 'logeado')
      res.status(200).json({ message: 'logeado' })
      // res.send({ data: token, message: 'Inicio de sesión correcto' })
    }
  )

  router.post('/signup', async function (req: express.Request, res: express.Response) {
    const user = await users.getBy({ username: req.body.username } as User)
    if (user) {
      console.log(`User ${user.username} already exists`)
      res.status(201).json({ data: user.username, message: 'User already exists' })
    } else {
      req.body.password = await Encryption.hashPassword(req.body.password)
      users.create(req.body).then((id) => {
        console.log(`created user ${id}`)
        const jsonToken: AccessToken = { usr: id, ip: req.connection.remoteAddress! }
        const token = jwt.generateToken(jsonToken, timeout)
        res.status(400).json({ data: token, message: 'User created' })
      })
    }
  })

  // router.post('/recover', async function (_req: express.Request, _res: express.Response) {})
}
