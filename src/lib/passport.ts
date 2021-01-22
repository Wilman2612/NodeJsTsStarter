import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from 'src/model/User'
import Users from 'src/services/Users'
import * as express from 'express'
// import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
// import { Strategy as FacebookStrategy } from 'passport-facebook'
// import { RegistrationTypes } from 'src/model/RegistrationTypes'
import * as Encryption from './bcrypt'

export function configAuth(app: express.Application) {
  const users = new Users()
  app.use(passport.initialize())
  // username and password
  passport.use(
    'local',
    new LocalStrategy(async function (username, password, done) {
      if (!username) return done(null, false, { message: 'Username cannot be empty' })
      const founded = await users.getBy({ username } as User)
      if (founded) {
        const isValid = Encryption.comparePassword(password, founded.password)
        if (isValid) return done(null, username)
        return done(null, false, { message: 'Username or password are incorrect' })
      }
      return done(null, false, { message: 'Username does not exists' })
    })
  )
  // jwt
  /* const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    issuer: 'books.com',
    audience: 'books.com'
  }
  passport.use(
    new JwtStrategy(opts, function (jwtPayload, done) {
      users
        .get(jwtPayload.sub)
        .then((user) => {
          if (user) return done(null, user.username)
          return done(null, false)
        })
        .catch((err) => {
          done(err, false)
        })
    })
  )

  // facebook
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID as string,
        clientSecret: process.env.FACEBOOK_APP_SECRET as string,
        callbackURL: '/auth/facebook/callback'
      },
      async function (_accessToken, _refreshToken, profile, done): Promise<void> {
        const user = await users.getBy({ facebook: profile.id } as User)
        if (user) return done(null, user.username)
        const id = await users.create({
          facebook: profile.id,
          username: profile.username,
          name: profile.displayName,
          perfilImage: `https://graph.facebook.com/${profile.id}/picture?type=square`,
          mail: profile.emails![0].value,
          registrationType: RegistrationTypes.Facebook
        } as User)
        return done(null, id)
      }
    )
  ) */
}

export const AuthMiddleware = function (req: express.Request, res: express.Response, next: any) {
  passport.authenticate('local', { failureFlash: true }, function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.json(info)
    }
    return next()
    // req.logIn(user, function(err) {
    //   if (err) {
    //     return next(err);
    //   }
    //   return res.json(info);
    // });
  })(req, res, next)
}
