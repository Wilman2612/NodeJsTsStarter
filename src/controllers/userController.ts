import User from 'models/User'
import Users from 'services/Users'
import * as Encryption from 'libs/bcrypt'
import Entity from './reponses/entity'

export default class UserController {
  users: Users

  constructor() {
    this.users = new Users()
  }

  async getUser(id: string) {
    const user = await this.users.get(id)
    user.password = undefined
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
