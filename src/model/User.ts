import { RegistrationTypes } from './RegistrationTypes'

export default class User {
  id: string

  name: string

  surname: string

  username: string

  password: string

  email: string

  registrationType: RegistrationTypes

  writer: boolean

  perfilImage: string

  followers: number

  following: User[]

  preferences: string[]

  facebook: string
}
