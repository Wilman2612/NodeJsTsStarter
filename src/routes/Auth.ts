import express from 'express'
import User from 'model/User'
import multer from 'multer'
import AuthController from 'controllers/authController'
import { authenticate } from 'middlewares/authmiddleware'

export function Route(root: express.Router) {
  const router = express.Router()
  const controller = new AuthController()
  const upload = multer()

  root.use('/auth', router)

  router.post(
    '/login',
    upload.none(),
    authenticate('local'),
    function (req: express.Request, res: express.Response) {
      const response = controller.login(req.user! as string)
      res.status(response.status).json({ ...response, message: req.t(response.message) })
    }
  )

  router.post('/signup', async function (req: express.Request, res: express.Response) {
    const result = await controller.signup(req.body as User)
    res.status(result.status).json({ ...result, message: req.t(result.message) })
  })

  // router.post('/recover', async function (_req: express.Request, _res: express.Response) {})
}
