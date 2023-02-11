const log4js = require('log4js')
log4js.configure({
    appenders:{
        consoleLogger:{type:'console', layout:{type:'coloured'}},
        fileErrorLogger:{type:'file', filename:'./src/logs/errors.log', layout:{type:'coloured'}},
        fileWarningLogger:{type:'file', filename:'./src/logs/warnings.log', layout:{type:'coloured'}},
        fileInfoLogger:{type:'file', filename:'./src/logs/info.log', layout:{type:'coloured'}},
        fileVerboseLogger:{type:'file', filename:'./src/logs/full.log', layout:{type:'coloured'}}
    },
    categories:{
        default:{appenders:['consoleLogger'], level:'ALL'},
        error:{appenders:['consoleLogger', 'fileErrorLogger'], level:'ERROR'},
        warning:{appenders:['consoleLogger', 'fileWarningLogger', 'fileVerboseLogger'], level:'WARN'},
        info:{appenders:['consoleLogger', 'fileInfoLogger', 'fileVerboseLogger'], level:'INFO', layout:'coloured'},
        all:{appenders:['consoleLogger', 'fileVerboseLogger'], level:'ALL'}
    }
})
const objetoLogger = { defecto:log4js.getLogger(), error:log4js.getLogger('error'), warning:log4js.getLogger('warning'), info:log4js.getLogger('info'), all:log4js.getLogger('all') }
module.exports = objetoLogger
