import { URL } from 'configs/mongo'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { router } from 'routes'

const app = express()

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

export { app }
