import * as swaggerUi from 'swagger-ui-express'
import { Application } from 'express'
import * as YAML from 'yamljs'

export function config(app: Application) {
  // const specs = swaggerJsdoc(options);
  const swaggerDocument = YAML.load('openapi.yml')
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
