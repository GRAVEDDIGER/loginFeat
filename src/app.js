// //////////////////
//  Imports       //
// //////////////////
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const handlebars = require('express-handlebars')
const colors = require('colors')
const Routes = require('./routes/routes')
const UserSchema = require('./models/userSchema').UserSchema
const passport = require('passport')
const flash = require('connect-flash')
const passportConfigBuilder = require('passport-fast-config').default
const PORT = process.env.PORT || 8080
const app = express()
const sesssionMiddleware = require('./middlewares/session')
/* session({
  store: MongoStore.create({mongoUrl:'mongodb+srv://dcsweb:MopG23GHLEu3GwB0@dcsweb.snm3hyr.mongodb.net/?retryWrites=true&w=majority', ttl:600000}),
  secret: 'Lorem Ipsum',
  cookie: { maxAge: 600000 },
  resave: false,
  saveUninitialized: false
}) */
app.listen(PORT, () => {
  console.log(colors.bgBlue.white(`Listening on ${PORT}`))
})
app.use(express.static(path.join(__dirname, 'public')))
// ///////////////////
//  Middlewares    //
// ///////////////////

app.use(sesssionMiddleware)
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
passportConfigBuilder(UserSchema).buildLocalConfig()
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use('/logout', Routes.logout)
app.use('/products', Routes.products)
app.use('/chat', Routes.chat)
app.use('/login', Routes.login)
app.use('/logout', Routes.login)
app.use('/', Routes.failroutes)
app.use('/register', Routes.register)
app.use(morgan('tiny'))

// ////////////////////
// error routes     //
// ////////////////////

// route not found
app.use((req, res) => { // ruta default desvia a login
  res.status(300).redirect('/login')
})
// /////////////////////
// Sockets            //
// /////////////////////

require('./socket/sockets')
/* Middleware para Socket IO que recupera session dentro del objeto request del socket */
/*
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
const socketSrv = socket(server)
socketSrv.use(wrap(sesssionMiddleware))

socketSrv.on('connection', async (socket) => {
  let userData
  console.log(colors.bgCyan.white.bold('WebSockets Connected'))
  socket.on('userRequest', async () => {
    userData = await passportAccess.users.findById(socket.request.session.passport.user)
    socket.emit('userResponse', JSON.stringify(objectTranspiler(userData, false)))
      })
  const data = await messagePersistance.find()
// envia al front la informacion obtenida de la base de datos en la colleccion de mensajes

  socket.emit('serverMessage', JSON.stringify(data))
// escucha cuando el front envia un nuevo mensaje y compone el objeto para generar la persistencia en la base de datos
  socket.on('clientMessage', (message) => {
    let messageParsed
    const msgObj = JSON.parse(message)
    console.log(colors.bgGreen.bold(msgObj))
// la funcion object transpiler genera el objeto a ser luego persistido
    messageParsed = JSON.stringify(objectTranspiler(userData, msgObj))
    messagePersistance.create(JSON.parse(messageParsed))
// envia la informacion al front para que se pinte en el dom
    socketSrv.emit('serverMessage', messageParsed)
  })
})
*/
