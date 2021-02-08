import * as express from 'express'
import UserController from 'controllers/userController'
import AuthMiddleware from 'middlewares/authmiddleware'

export function Route(root: express.Router) {
  const router = express.Router()
  const controller = new UserController()
  root.use('/user', router)
  root.use(AuthMiddleware)
  router.get('/:id', async function (req: express.Request, res: express.Response) {
    console.log(req.params.id)
    const result = await controller.getUser(req.params.id)
    res.status(result.status).json(result)
  })

  router.patch('/:id', async function (req: express.Request, res: express.Response) {
    const result = await controller.updateUser(req.params.id, req.body)
    res.status(result.status).json(result)
  })
}
