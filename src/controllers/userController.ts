import User from 'model/User'
import Users from 'services/Users'
import * as Encryption from 'lib/bcrypt'
import errors from 'http-errors'
import Entity from '@reponses/entity'

export default class UserController {
  users: Users

  constructor() {
    this.users = new Users()
  }

  async getUser(id: string) {
    const user = await this.users.get(id)
    user.password = undefined
    if (!user) throw new errors.BadRequest('user.NotExist')
    return { status: 200, data: user } as Entity
  }

  async updateUser(id: string, user: User) {
    const changes = { ...user }
    const actual = await this.users.get(id)
    if (!Encryption.comparePassword(changes.password!, actual.password!)) {
      changes.password = await Encryption.hashPassword(changes.password!)
    }
    this.users.update(id, user)
    return this.getUser(id)
  }
}
