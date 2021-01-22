import * as express from 'express'
import * as dotenv from 'dotenv'
import Load from './src/app'

dotenv.config()
const app = express()

// configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 3000 // seteamos el puerto

Load(app)

app.listen(port, () => {
  console.log('listening at port 3000')
})
