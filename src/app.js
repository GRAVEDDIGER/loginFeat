function main(PORT, logger) {
// //////////////////
//  Imports       //
// //////////////////
// const cluster = require('cluster')
const express = require('express')

const app = express()
const path = require('path')
const handlebars = require('express-handlebars')
const initializeSockets = require('./socket/sockets')
const sessionMiddleware = require('./middlewares/session')
const middlewares = require('./middlewares/middlewares')

// if (!cluster.isPrimary) {
const server = app.listen(PORT, () => {
  logger.info.info(`Listening on ${PORT}`)
})
// ///////////////////
//  Middlewares    //
// ///////////////////
app.use(express.static(path.join(__dirname, 'public')))
const passportConfigObject = middlewares(app, express)
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
// route not found
app.use((req, res) => { // ruta default desvia a login
  logger.warning.warn('Route not yet implemented')
  res.status(300).redirect('/login')
})
// /////////////////////
// Sockets            //
// /////////////////////
initializeSockets(server, passportConfigObject, sessionMiddleware, logger)
}
// }
module.exports = main
