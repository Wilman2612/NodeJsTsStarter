import User from 'models/User'
import * as Encryption from 'libs/bcrypt'
import Users from 'services/Users'
import * as jwt from '../lib/jwt'

export interface AuthResponse {
  message: string
  data: string
}

export interface AccessToken {
  usr: string
  tmo: string
}
const timeout = '3600s'

export default class AuthController {
  users: Users

  constructor() {
    this.users = new Users()
  }

  login(userId: string) {
    const response: AuthResponse = {
      data: this.getToken(userId),
      message: 'Inicio de sesión correcto'
    }
    return response
  }

  async signup(user: User) {
    const founded = await this.users.getBy({ username: user.username } as User)
    if (founded) throw new Error('User already exists')
    const newUser: User = { ...user, password: await Encryption.hashPassword(user.password) }
    const id = await this.users.create(newUser)
    return { data: this.getToken(id), message: 'User created' }
  }

  getToken = (id: string) => {
    const jsonToken: AccessToken = { usr: id, tmo: timeout }
    const token = jwt.generateToken(jsonToken, timeout)
    return token
  }
}
