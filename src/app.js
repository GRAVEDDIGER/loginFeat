// //////////////////
//  Imports       //
// //////////////////
const express = require('express')
const colors = require('colors')
const PORT = require('./helper/commandline') || 8080
const app = express()
const path = require('path')
const handlebars = require('express-handlebars')
const initializeSockets = require('./socket/sockets')
const sessionMiddleware = require('./middlewares/session')
const middlewares = require('./middlewares/middlewares')
const server = app.listen(PORT, () => {
  console.log(colors.bgBlue.white(`Listening on ${PORT}`))
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
  res.status(300).redirect('/login')
})
// /////////////////////
// Sockets            //
// /////////////////////
initializeSockets(server, passportConfigObject, sessionMiddleware)
