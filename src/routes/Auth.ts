import * as express from 'express'
import User from 'models/User'
import * as multer from 'multer'
import AuthController from 'src/controllers/authController'
import { AuthMiddleware, configAuth } from '../lib/passport'

export function Route(app: express.Application, root: express.Router) {
  configAuth(app)

  const router = express.Router()
  const controller = new AuthController()
  const upload = multer()

  root.use('/auth', router)

  router.post(
    '/login',
    upload.none(),
    AuthMiddleware,
    function (req: express.Request, res: express.Response) {
      const response = controller.login(req.user! as string)
      res.json(response)
    }
  )

  router.post('/signup', async function (req: express.Request, res: express.Response) {
    controller
      .signup(req.body as User)
      .then((msg) => res.status(201).json(msg))
      .catch((err) => res.status(400).json({ message: err.message, status: 400 }))
  })

  // router.post('/recover', async function (_req: express.Request, _res: express.Response) {})
}
