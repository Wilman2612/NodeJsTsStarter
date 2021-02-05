import User from 'models/User'
import * as Encryption from 'libs/bcrypt'
import Users from 'services/Users'
import errors from 'http-errors'
import * as jwt from '../lib/jwt'

export interface AuthResponse {
  status: number
  message: string
  data: string
  id: string
}

export interface AccessToken {
  usr: string
  tmo: string
}

const ranges = [
  '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
  '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
  '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
].join('|')

const containsEmoji = (str: string) =>
  str.length !== str.replace(new RegExp(ranges, 'g'), '').length

export function validateLogin(user: User) {
  if (String.isNullorWhiteSpace(user.username)) return 'login.noUsrNm'
  if (String.isNullorWhiteSpace(user.password)) return 'login.noPass'
  if (containsEmoji(user.password!)) return 'login.passEmoji'
  if (user.password!.length < 8) return 'login.passShort'
  if (user.password!.length > 50) return 'login.passLong'
  return null
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
      message: 'login.success',
      status: 200,
      id: userId
    }
    return response
  }

  async signup(user: User) {
    const founded = await this.validateSignUp(user)
    if (founded) throw new errors.BadRequest('signup.usrExists')
    const newUser: User = { ...user, password: await Encryption.hashPassword(user.password!) }
    const id = await this.users.create(newUser)
    return { data: this.getToken(id), message: 'signup.success', status: 201, id } as AuthResponse
  }

  async validateSignUp(user: User) {
    const err = validateLogin(user)
    if (err) return err
    if (String.isNullorWhiteSpace(user.email)) return 'signup.noEmail'
    if (String.isNullorWhiteSpace(user.name)) return 'signup.noName'
    const founded = await this.users.getBy(
      {
        username: user.username
      } as User,
      { email: user.email } as User
    )
    if (founded) return 'signup.usrExists'
    return null
  }

  getToken = (id: string) => {
    const jsonToken: AccessToken = { usr: id, tmo: timeout }
    const token = jwt.generateToken(jsonToken, timeout)
    return token
  }
}
