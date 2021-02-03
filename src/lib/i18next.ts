import i18next from 'i18next'
import Backend from 'i18next-node-fs-backend'
import * as i18nextMiddleware from 'i18next-express-middleware'

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: './resources/locales/{{lng}}/{{ns}}.json'
    },
    fallbackLng: 'es',
    preload: ['en', 'es'],
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
      // keys or params to lookup language from
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupHeader: 'accept-language',
      lookupSession: 'lng',
      lookupPath: 'lng',
      lookupFromPathIndex: 0
    }
  })
export default () => i18nextMiddleware.handle(i18next)

// export const Init = () => i18nextMiddleware.handle(i18next)
// export const ChangeLenguage=()=> (req:any, _res:any, next:any) => {
//     i18next.changeLanguage(req.language);
//   };
