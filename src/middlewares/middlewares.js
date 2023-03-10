
const morgan = require('morgan')
const Routes = require('../routes/routes')
// const UserSchema = require('../models/userSchema').UserSchema
const passport = require('passport')
const flash = require('connect-flash')
const passportConfigBuilder = require('passport-fast-config')
const sesssionMiddleware = require('./session')
const morganLog4JS = require('../helper/customMogan')
const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: './mydb.sqlite' }
})// convirtiendo a models el param del modulo
function middlewares(app, express) {
    app.use(sesssionMiddleware)
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    const passportConfigObject = passportConfigBuilder({db:knex,
dbSchema:{
      nombre: 'string',
      apellido: 'string',
      edad: 'number',
      alias: 'string',
      avatar: 'string'}}, 'SQL')
    .GoogleoAuth({
        clientID: '781852376959-1rqb531406erb9hplkvcrg7rmhdjp0hb.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8080/auth/google/callback'
      }, true)
    .buildLocalConfig()
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    app.use('/info', Routes.info)
    app.use('/login', Routes.login)
    app.use('/random', Routes.random)
    app.use('/update', Routes.update)
    app.use('/logout', Routes.logout)
    app.use('/products', Routes.products)
    app.use('/chat', Routes.chat)
    app.use('/logout', Routes.login)
    app.use('/', Routes.failroutes)
    app.use('/register', Routes.register)
    app.use('/auth/google', Routes.goa)
    app.use(morgan(morganLog4JS))
return passportConfigObject
}
module.exports = middlewares
