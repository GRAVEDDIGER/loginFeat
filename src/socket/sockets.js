const colors = require('colors')
const socket = require('socket.io')
const messagePersistance = require('../models/mensajes').userModel
const objectTranspiler = require('../helper/objectTranspiler')
function initializeSockets(server, passportConfigObject, sessionMiddleware) {
  const usersModel = passportConfigObject.users
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
const socketSrv = socket(server)
socketSrv.use(wrap(sessionMiddleware))

socketSrv.on('connection', async (socket) => {
  let userData
  console.log(colors.bgCyan.white.bold('WebSockets Connected'))
  socket.on('userRequest', async () => {
    userData = await usersModel.findById(socket.request.session.passport.user)
    socket.emit('userResponse', JSON.stringify(objectTranspiler(userData, false)))
      })
  const data = await messagePersistance.find()
// envia al front la informacion obtenida de la base de datos en la colleccion de mensajes

  socket.emit('serverMessage', JSON.stringify(data))
// escucha cuando el front envia un nuevo mensaje y compone el objeto para generar la persistencia en la base de datos
  socket.on('clientMessage', (message) => {
    let messageParsed
    const msgObj = JSON.parse(message)
// la funcion object transpiler genera el objeto a ser luego persistido
    messageParsed = JSON.stringify(objectTranspiler(userData, msgObj))
    messagePersistance.create(JSON.parse(messageParsed))
// envia la informacion al front para que se pinte en el dom
    socketSrv.emit('serverMessage', messageParsed)
  })
})
}
module.exports = initializeSockets
