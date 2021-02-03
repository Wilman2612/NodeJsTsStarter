import * as i18next from 'i18next'

declare global {
  namespace Express {
    interface Request {
      t: i18next.TFunction
      i18n: i18next.i18n
    }
  }
}
// declare module 'express-serve-static-core' {
//   interface Request {
//     t:TFunction
//   }
// }
