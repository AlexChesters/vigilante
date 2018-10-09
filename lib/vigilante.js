const http = require('http')

const noop = () => { }

const customResponse = require('./response')

module.exports = (routeHandlers) => {
  const server = http.createServer()

  server.on('request', async (request, response) => {
    const matchingRouteHandler = routeHandlers.find((handler) => {
      const { method, url: path } = request
      return handler.method === method && handler.path === path
    })

    if (!matchingRouteHandler) {
      response.statusCode = 404
      response.end()
      return
    }

    await matchingRouteHandler.handle(request, customResponse(response))
  })

  return {
    start: (port = 8080, callback = noop) => {
      server.listen(port, callback)
    }
  }
}
