require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const session = require('express-session')
const connectDb = require('./config/mongoDBConnection')
const Swagger = require('./Swagger')
const routes = require('./routes')

// Connect to MongoDB
connectDb()


// Setup Swagger
Swagger(app)


app.use(helmet())

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(session({secret: 'telegram-secret', resave: false,saveUninitialized: true,
  cookie: {
      secure: false
    }
  })
)


// Routes
app.use('/api', routes)



module.exports = app