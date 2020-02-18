// Load modules
const express = require('express')
const slash = require('express-slash')
const path = require('path').resolve() //placeholder

const logger = require('./tools/logger')
const config = require('./config')
const DB = require('./database')

// Load routers
const indexRouter = require('./router/index')

// Database
global.knex = DB.create()

// Express
let app = express()

app.set('view engine', 'ejs')
app.set('views', './page')
app.enable('strict routing')

// Router setting
app.use(indexRouter)
app.use(slash()) // Must place after root page('/') and before any other pages

app.listen(config.PORT, () => {
  logger.startLog(config.PORT)
})
