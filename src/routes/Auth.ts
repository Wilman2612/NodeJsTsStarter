import * as express from 'express'
import User from 'models/User'
import * as multer from 'multer'
import AuthController from 'src/controllers/authController'
import AuthMiddleware from 'src/middlewares/authmiddleware'

export function Route(root: express.Router) {
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
      res.status(response.status).json(response)
    }
  )

  router.post('/signup', async function (req: express.Request, res: express.Response) {
    const result = await controller.signup(req.body as User)
    res.status(result.status).json(result)
  })

  // router.post('/recover', async function (_req: express.Request, _res: express.Response) {})
}
