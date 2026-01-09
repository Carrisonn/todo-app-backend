import express from 'express'
import cors from 'cors'
import { DB } from './DB/DB.js'
import { corsOptions } from './config/cors.js'
import { router } from './routes/router.js'

const app = express()

const PORT = process.env.PORT ?? 8080

await DB.authenticate()
await DB.sync()

app.use(cors(corsOptions))

app.disable('x-powered-by')

app.use(express.json())

app.use('/api', router)

app.listen(PORT)
