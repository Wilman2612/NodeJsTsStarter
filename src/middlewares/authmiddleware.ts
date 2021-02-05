import passport from 'passport'
import * as express from 'express'
import errors from 'http-errors'

export const authenticate = (method: string) =>
  function (req: express.Request, res: express.Response, next: any) {
    passport.authenticate(
      method,
      { failureFlash: true, session: false },
      function (err, user, info) {
        if (err) return next(err)

        if (user) {
          req.user = user
        } else return next(new errors.Unauthorized(info.message))

        return next()
        // not handling sessions
        // req.logIn(user, function(err) {
        //   if (err) {
        //     return next(err);
        //   }
        //   return res.json(info);
        // });
      }
    )(req, res, next)
  }

export default authenticate('jwt')
