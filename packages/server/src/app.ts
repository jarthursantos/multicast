import { URL } from 'configs/mongo'
import express from 'express'
import mongoose from 'mongoose'
import { router } from 'routes'

const app = express()

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(router)

export { app }
