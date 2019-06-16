import express from 'express'
import bodyParser from 'body-parser'
import {devMiddleware, hotMiddleware} from './webpack.js'
import path from 'path'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  app.use(devMiddleware())
  app.use(hotMiddleware())
}

const STATIC_FILES_DIRECTORY = path.join(__dirname, '../client/static')

app.use(express.static(STATIC_FILES_DIRECTORY))

app.listen(3000, () => {
  console.log('PWA workshop listening on port 3000!')
})
