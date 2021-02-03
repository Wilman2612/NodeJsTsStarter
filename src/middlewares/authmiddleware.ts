import passport from 'passport'
import * as express from 'express'

export default function (req: express.Request, res: express.Response, next: any) {
  passport.authenticate('local', { failureFlash: true }, function (err, user, info) {
    if (err) {
      return next(err)
    }

    if (user) {
      req.user = user
    } else return res.json(info)

    return next()
    // not handling sessions
    // req.logIn(user, function(err) {
    //   if (err) {
    //     return next(err);
    //   }
    //   return res.json(info);
    // });
  })(req, res, next)
}
