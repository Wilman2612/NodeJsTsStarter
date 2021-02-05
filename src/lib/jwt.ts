import * as jwt from 'jsonwebtoken'
import { AccessToken } from 'src/controllers/authController'

export function generateToken(data: AccessToken, timeout: string) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET as any, { expiresIn: timeout })
}

export function verifyToken(token: string, callback: (err: any, token: any) => void) {
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, callback)
}
