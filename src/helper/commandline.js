const yargs = require('yargs/yargs')(process.argv.slice(2))
let PORT
let isFork = false
let isCluster = false
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

yargs.command(
    {    command:'FORK',
        describe:'GENERATES A CHILD PROCESS AND EXECUTES THE SERVER IN IT ',
        handler:(args) => {
          isFork = true
    }})
yargs.command(
        {    command:'CLUSTER',
            describe:'GENERATES A A CHILD PROCESS FOR EACH CPU CORE',
            handler:(args) => {
              isCluster = true
        }})

yargs.parse()
module.exports = {PORT, isFork, isCluster}
