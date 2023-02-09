require('dotenv').config()
const session = require('express-session')
const MongoStore = require('connect-mongo')
console.log(process.env.MONGOURL)
const sesssionMiddleware = session({
    store: MongoStore.create({mongoUrl:process.env.MONGOURL, ttl:600000}),
    secret: 'Lorem Ipsum',
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: false
  })
module.exports = sesssionMiddleware
