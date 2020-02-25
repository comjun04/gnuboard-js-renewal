// Load modules
const express = require('express')
const slash = require('express-slash')
const path = require('path').resolve() //placeholder
const session = require('express-session')
const SessionFileStore = require('session-file-store')(session)
const cookieParser = require('cookie-parser')

const logger = require('./tools/logger')
const config = require('./config')()
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

// Cookie
app.use(cookieParser())

// Static files (client-side js, css...)
app.use('/src', express.static('./src'))

// Sessions
app.use(session({
  secret: 'MUST MOVE TO SETTING FILE / keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    domain: config.cookieDomain
  },
  store: new SessionFileStore({
    ttl: 60 * 180,
    reapInterval: 10800,
    path: './data/session'
  })
}))

// Router setting
app.use('/', indexRouter)
app.use(slash()) // Must place after root page('/') and before any other pages

app.listen(config.PORT, () => {
  logger.startLog(config.PORT)
})
