// const { command } = require('yargs')

require('dotenv').config()
const objectLogger = require('./configurations/log4js.config')
const main = require('./app')
const {hideBin} = require('yargs/helpers')
const cluster = require('cluster')
const CPUS = require('os').cpus()
const yargs = require('yargs')(hideBin(process.argv))
let PORT = 8080
let MODE = 'FORK'
yargs
  .command({
    command:'start',
    describe:'Sets Port and Mode of the server',
    builder:{port:{
        describe:'Sets the port of the server',
        type:'number'
    },
    mode:{
        describe:'Sets the mode of the server',
        type:'string'
    }

},
handler: (args) => { PORT = args.port || 8080; MODE = args.mode || 'FORK' }}
).parse()
if (MODE === 'CLUSTER') {
    if (cluster.isPrimary) {
        CPUS.forEach(() => {
            const worker = cluster.fork()
            objectLogger.info.info('Worker Created PID: ' + worker.process.pid)
})
cluster.on('exit', (worker, code) => {
    objectLogger.error.error(`Worker PID: ${worker.process.pid} exited with code: ${worker}`)
    cluster.fork()
})
    } else main(PORT, objectLogger)
} else main(PORT, objectLogger)

// else {
//     if (cluster.isPrimary) {
//         const worker = cluster.fork()
//         objectLogger.info.info('Fork Mode wroker PID: ', worker.process.pid)

//         cluster.on('exit', (worker, code) => {
//             objectLogger.error.error(`Worker PID: ${worker.process.pid} exited with code: `, code)
//             cluster.fork()
//         })
// } else main(PORT, objectLogger)
// }
