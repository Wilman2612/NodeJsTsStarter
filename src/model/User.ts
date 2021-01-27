export default interface User {
  id: string

  name: string

  surname?: string

  username: string

  password: string

  email: string

  registrationType: 'local' | 'Facebook' | 'Twitter'

  perfilImage: string

  followers?: number

  following?: User[]

  preferences?: string[]
}
