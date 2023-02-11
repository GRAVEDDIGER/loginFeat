const mongoose = require('mongoose')
const objectLogger = require('../configurations/log4js.config')

require('dotenv').config()
const url = process.env.MONGOURL
const dbConnect = async () => {
    mongoose.set('strictQuery', true)
    return mongoose.connect(url)
  }
dbConnect()
    .then(() => objectLogger.info.info('Mongo connected'))
    .catch(() => objectLogger.error.error('Unable to connect DB'))

const Schema = mongoose.Schema
const messageSchema = new Schema({
    author:{
        id:{type:String, required:true},
        nombre:{type:String, required:true},
        apellido:{type:String, required:true},
        edad:{type:String, required:true},
        alias:{type:String, required:true},
        avatar:{type:String, required:true}

    },
    text:{
        type:'string'
    }}, {timestamps:true}

)
const userSchema = new Schema({
    user: {type:String, required:true, unique:true},
    password:{type:String, required:true},
    nombre:{type:String, required:true},
        apellido:{type:String, required:true},
        edad:{type:String, required:true},
        alias:{type:String, required:true},
        avatar:{type:String, required:true}

})
const userCollection = mongoose.model('chatUsers', userSchema)
const userModel = mongoose.model('messageCollection', messageSchema)
module.exports = {userModel, userCollection}
