/* eslint-disable brace-style */
'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DAOSelector = void 0
const SqlDAO = require('./sqlDAO').default
const MongoDAO = require('./mongoDAO')
console.log(SqlDAO, MongoDAO)
class DAOSelector {
    constructor(schemaObject, schemaType, MONGO = new MongoDAO(schemaObject, schemaType))//, SQL = new SqlDAO(schemaObject, schemaType)) {
    {
     this.MONGO = MONGO
       // this.SQL = SQL
    }
}
exports.DAOSelector = DAOSelector
