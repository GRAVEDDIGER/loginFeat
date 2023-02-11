const userDb = require('../models/mensajes').userCollection
const objectLogger = require('../configurations/log4js.config')

const createUser = async (req, res) => {
    userDb.create(req.body)
       .then(() => res.redirect('/login'))
       .catch(err => {
             objectLogger.error.error(err)
             res.redirect('/register')
           })
       }
module.exports = createUser
