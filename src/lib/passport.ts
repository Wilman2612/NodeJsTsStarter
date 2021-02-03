import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from 'src/model/User'
import Users from 'src/services/Users'
import * as express from 'express'
import * as Encryption from './bcrypt'

export default function configAuth(app: express.Application) {
  const users = new Users()
  app.use(passport.initialize())
  // username and password
  passport.use(
    'local',
    new LocalStrategy(async function (username, password, done) {
      if (!username) return done(null, false, { message: 'usrnmNEmpty' })
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
