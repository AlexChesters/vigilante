const http = require('http')

const noop = () => { }

const customRequest = require('./request')
const customResponse = require('./response')

module.exports = (routeHandlers) => {
  const server = http.createServer()

  server.on('request', async (request, response) => {
    const req = customRequest(request)
    const res = customResponse(response)

    const matchingRouteHandler = routeHandlers.find((handler) => {
      const { method, url: path } = request
      return handler.method === method && handler.path === path
    })

    if (!matchingRouteHandler) {
      response.statusCode = 404
      response.end()
      return
    }

    if (matchingRouteHandler.middlewares) {
      const middlewares = matchingRouteHandler.middlewares.map((fn) => fn(req))
      await Promise.all(middlewares)
    }

    await matchingRouteHandler.handle(req, res)
  })

  return {
    start: (port = 8080, callback = noop) => {
      server.listen(port, callback)
    }
  }
}
