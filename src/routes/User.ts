import * as express from 'express'
import UserController from 'src/controllers/userController'
import AuthMiddleware from 'src/middlewares/authmiddleware'

export function Route(root: express.Router) {
  const router = express.Router()
  const controller = new UserController()
  root.use('/user', router)
  root.use(AuthMiddleware)
  router.get('/{:id}', async function (req: express.Request, res: express.Response) {
    const result = await controller.getUser(req.params.id)
    res.json(result.status).json(result)
  })

  router.patch('/{:id}', async function (req: express.Request, res: express.Response) {
    const result = await controller.updateUser(req.params.id, req.body)
    res.json(result.status).json(result)
  })
}
