const morgan = require('morgan')
const Routes = require('../routes/routes')
const UserSchema = require('../models/userSchema').UserSchema
const passport = require('passport')
const flash = require('connect-flash')
const passportConfigBuilder = require('passport-fast-config').default
const sesssionMiddleware = require('./session')

function middlewares(app, express) {
    app.use(sesssionMiddleware)
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    const passportConfigObject = passportConfigBuilder(UserSchema).buildLocalConfig()
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    app.use('/random', Routes.random)
    app.use('/logout', Routes.logout)
    app.use('/products', Routes.products)
    app.use('/chat', Routes.chat)
    app.use('/login', Routes.login)
    app.use('/logout', Routes.login)
    app.use('/info', Routes.info)
    app.use('/', Routes.failroutes)
    app.use('/register', Routes.register)
    app.use(morgan('tiny'))
return passportConfigObject
}
module.exports = middlewares
