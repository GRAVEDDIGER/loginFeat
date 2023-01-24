// //////////////////
//  Imports       //
// //////////////////

const express = require('express')
const morgan = require('morgan')
const socket = require('socket.io')
const path = require('path')
const handlebars = require('express-handlebars')
const colors = require('colors')
const products = require('./routes/product.js')
const chat = require('./routes/chat')
const login = require('./routes/login')
const logout = require('./routes/logout')
const objectTranspiler = require('./helper/objectTranspiler')
const register = require('./routes/register')
const session = require('express-session')
// const FileStorage = require('session-file-store')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const flash = require('connect-flash')
const passportConfigBuilder = require('passport-fast-config')

const messagePersistance = require('./models/mensajes').userModel
const PORT = process.env.PORT || 8080
const app = express()
const sesssionMiddleware = session({
  store: MongoStore.create({mongoUrl:'mongodb+srv://dcsweb:MopG23GHLEu3GwB0@dcsweb.snm3hyr.mongodb.net/?retryWrites=true&w=majority', ttl:600}),
  secret: 'Lorem Ipsum',
  resave: true,
  saveUninitialized: true
})
const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`.bgBlue.white)
})
console.log(flash())
app.use(express.static(path.join(__dirname, 'public')))
// ///////////////////
//  Middlewares    //
// ///////////////////

app.use(sesssionMiddleware)
app.use(flash())
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
passportConfigBuilder({
  nombre:{type:String, require},
  apellido:{type:String, require},
  edad:{type:Number, require},
  alias:{type:String, require},
  avatar:{type:String, require}
}, 'mongodb+srv://dcsweb:MopG23GHLEu3GwB0@dcsweb.snm3hyr.mongodb.net/?retryWrites=true&w=majority')
  .GoogleoAuth(
    {
  clientID: '781852376959-1rqb531406erb9hplkvcrg7rmhdjp0hb.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:8080/auth/google/callback'
    }, true)
  .initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use('/logout', logout)
app.use('/products', products)
app.use('/chat', chat)
app.use('/login', login)
app.use('/logout', login)
app.use('/register', register)
app.use(morgan('tiny'))

// ////////////////////
// error routes     //
// ////////////////////
app.get('/registerFailure', (req, res) => {
  res.render('registerFailure')
})
app.get('/failedLogin', (req, res) => {
  console.log(req.flash('error'))
  res.send({error:req.flash('error')})
})

// route not found
app.use((req, res) => { // ruta default desvia a login
  res.status(300).redirect('/login')
})
// /////////////////////
// Sockets            //
// /////////////////////

/* Middleware para Socket IO que recupera session dentro del objeto request del socket */
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
const socketSrv = socket(server)
socketSrv.use(wrap(sesssionMiddleware))

socketSrv.on('connection', async (socket) => {
  console.log(colors.bgCyan.white.bold('WebSockets Connected'))
  socket.on('userRequest', () => {
       socket.emit('userResponse', JSON.stringify(objectTranspiler(socket.request.session.user, false)))
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
    messageParsed = JSON.stringify(objectTranspiler(socket.request.session.user, msgObj))
    messagePersistance.create(JSON.parse(messageParsed))
// envia la informacion al front para que se pinte en el dom
    socketSrv.emit('serverMessage', messageParsed)
  })
})
