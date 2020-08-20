import {Application, Request, Response, NextFunction } from 'express'
const express = require('express')
// const express = require('express')

import mongoose from 'mongoose'
import config from 'config'
import bodyParser from 'body-parser'
// require('typescript-require')

const app = express()

const PORT: number = config.get('port') || 5000
const URI: string = config.get('mongoUri')

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({extended: true}))

app.use('/api/meme', require('./routes/meme.routes'))
app.use('/api/auth', require('./routes/auth.routes'))

app.use(express.static('public'));

async function start() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('монга подключена ', new Date().toLocaleDateString())

    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    )
  } catch (e) {
    console.log('Server error: ', e.message)
    process.exit(1)
  }
}

start()
