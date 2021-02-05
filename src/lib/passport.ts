import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, StrategyOptions, ExtractJwt } from 'passport-jwt'
import User from 'src/model/User'
import Users from 'src/services/Users'
import * as express from 'express'
import { AccessToken, validateLogin } from 'src/controllers/authController'
import * as Encryption from './bcrypt'

export default function configAuth(app: express.Application) {
  app.use(passport.initialize())
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
    // issuer : 'accounts.examplesoft.com',
    // audience : 'yoursite.net'
  }
  // jwt
  passport.use(
    'jwt',
    new JwtStrategy(opts, function (token: AccessToken, done) {
      console.log('jwt')
      done(null, token.usr)
    })
  )

  const users = new Users()
  // username and password
  passport.use(
    'local',
    new LocalStrategy(async function (username, password, done) {
      console.log('local')
      const err = validateLogin({ username, password } as User)
      if (err) return done(null, false, { message: err })
      const founded = await users.getBy({ username } as User)
      if (founded) {
        const isValid = Encryption.comparePassword(password, founded.password!)
        if (isValid) return done(null, founded._id)
        return done(null, false, { message: 'login.accIncorrect' })
      }
      return done(null, false, { message: 'login.usrnmNotFnd' })
    })
  )
}
