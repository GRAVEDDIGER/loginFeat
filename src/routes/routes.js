const chat = require('./chat')
const failroutes = require('./failroutes')
const login = require('./login')
const logout = require('./logout')
const products = require('./product')
const register = require('./register')

const  Routes = {chat, failroutes, login, logout, register, products}

module.exports = Routes
