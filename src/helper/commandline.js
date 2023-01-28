const yargs = require('yargs/yargs')(process.argv.slice(2))
let PORT
yargs.command(
{    command:'port',
    describe:'Sets the port Configuration for the web server',
    builder:{
        number:{
            demandOption:true,
            describe:'Port number for the web server',
            type:'number'

    }},
    handler:(args) => {
      PORT = args.number
}})
yargs.parse()
module.exports = PORT
