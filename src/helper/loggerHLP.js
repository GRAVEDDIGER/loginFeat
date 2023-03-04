/* eslint-disable camelcase */
'use strict'
var __createBinding = (this && this.__createBinding) || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k
    var desc = Object.getOwnPropertyDescriptor(m, k)
    if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k] } }
    }
    Object.defineProperty(o, k2, desc)
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k
    o[k2] = m[k]
})
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? function(o, v) {
    Object.defineProperty(o, 'default', { enumerable: true, value: v })
} : function(o, v) {
    o['default'] = v
})
var __importStar = (this && this.__importStar) || function(mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null) for (var k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.loggerObject = void 0
const winston_1 = __importStar(require('winston'))
exports.loggerObject = {
    info: winston_1.default.createLogger({
        level: 'info',
        format: winston_1.format.combine(winston_1.format.label({ label: 'Logged by passport-fast-config' }), winston_1.format.timestamp(), winston_1.format.prettyPrint()),
        transports: [new winston_1.default.transports.Console(),
            new winston_1.default.transports.File({ filename: 'info.log' })]
    }),
    warning: winston_1.default.createLogger({
        level: 'warning',
        format: winston_1.format.combine(winston_1.format.label({ label: 'Logged by passport-fast-config' }), winston_1.format.timestamp(), winston_1.format.prettyPrint()),
        transports: [new winston_1.default.transports.Console(),
            new winston_1.default.transports.File({ filename: 'warning.log' })]
    }),
    debug: winston_1.default.createLogger({
        level: 'debug',
        format: winston_1.format.combine(winston_1.format.label({ label: 'Logged by passport-fast-config' }), winston_1.format.timestamp(), winston_1.format.prettyPrint(), winston_1.format.ms()),
        transports: [new winston_1.default.transports.Console(),
            new winston_1.default.transports.File({ filename: 'debug.log' })]
    }),
    error: winston_1.default.createLogger({
        level: 'error',
        format: winston_1.format.combine(winston_1.format.label({ label: 'Logged by passport-fast-config' }), winston_1.format.timestamp(), winston_1.format.prettyPrint()),
        transports: [new winston_1.default.transports.Console(),
            new winston_1.default.transports.File({ filename: 'error.log' })]
    })
}