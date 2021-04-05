require("dotenv").config();
const express = require('express')

import mongoose from 'mongoose'
import config from 'config'
const cookieParser = require('cookie-parser'); 

const app = express()
app.use(cookieParser());

const PORT: number = config.get('port') || 5000
const URI: string = config.get('mongoUri')
app.use(express.json({extended: true}))

app.use('/api/meme', require('./routes/meme.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))

app.use(express.static('public'));

const start = async () => {
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
