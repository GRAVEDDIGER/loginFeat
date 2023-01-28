require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGOURL).then(() => console.log('Mongo Connected'))
const UserSchema = new mongoose.Schema({
    nombre:{type:String, require},
    apellido:{type:String, require},
    edad:{type:Number, require},
    alias:{type:String, require},
    avatar:{type:String, require}
  })
const userModel = mongoose.model('users', UserSchema)
module.exports = {UserSchema, userModel}
