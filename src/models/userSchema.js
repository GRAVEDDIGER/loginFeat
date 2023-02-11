require('dotenv').config()
const objectLogger = require('../configurations/log4js.config')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGOURL).then(() => objectLogger.info.info('Mongo Connected'))
const UserSchema = new mongoose.Schema({
    nombre:{type:String, require},
    apellido:{type:String, require},
    edad:{type:Number, require},
    alias:{type:String, require},
    avatar:{type:String, require}
  })
module.exports = {UserSchema}
