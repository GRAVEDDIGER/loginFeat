const objectLogged = require('../configurations/log4js.config')

function morganLog4JS(tokens, req, res) {
    const objeto = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
    objectLogged.info.info(objeto)
  }

module.exports = morganLog4JS
