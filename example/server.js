const vigilante = require('../index')

const routeHandlers = require('./route-handlers')

const server = vigilante(routeHandlers)

server.start(
  8080,
  () => { console.log('vigilante example server is running') }
)
