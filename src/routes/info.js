const routes = require('express').Router()
routes.get('/', (req, res) => {
const dataObject = {
    args:process.argv.slice(2),
    so:process.platform,
    node:process.version,
    memory:process.memoryUsage.rss(),
    path:process.execPath,
    pid:process.pid,
    cwd:process.cwd()

}
console.log(process.argv.splice(2).join(','))
res.render('info', {processData:dataObject})
})
module.exports = routes
