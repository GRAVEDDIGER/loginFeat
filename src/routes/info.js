const routes = require('express').Router()
const compresion = require('compression')
const objectLogger = require('../configurations/log4js.config')
routes.get('/', compresion(6), (req, res) => {
const dataObject = {
    args:process.argv.slice(2),
    so:process.platform,
    node:process.version,
    memory:process.memoryUsage.rss(),
    path:process.execPath,
    pid:process.pid,
    cwd:process.cwd()

}
objectLogger.info.info(dataObject)
res.render('info', {processData:dataObject})
})
module.exports = routes
