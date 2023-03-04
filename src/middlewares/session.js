require('dotenv').config()
console.log(process.env.MONGOURL)
const session = require('express-session')
// const MongoStore = require('connect-mongo')
const KnexSessionStore = require('connect-session-knex')(session)
const store = KnexSessionStore({tablename:'users'})
const sesssionMiddleware = session({
    // store: MongoStore.create({mongoUrl:'mongodb+srv://dcsweb:MopG23GHLEu3GwB0@dcsweb.snm3hyr.mongodb.net/?retryWrites=true&w=majority', ttl:600000}),
    store,
    secret: 'Lorem Ipsum',
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: false
  })
module.exports = sesssionMiddleware
