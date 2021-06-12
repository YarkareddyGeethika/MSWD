
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const notesRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const app = express()


app.use(cors())
app.use(express.static('build')) // front-end
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

logger.info('connecting to', config.MONGODB_URL)
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { logger.info('Connected to MongoDB') })
    .catch((error) => { logger.error('Error connection to MongoDB:', error.message) })


app.use('/api/blogs', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app