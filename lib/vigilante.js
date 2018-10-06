const http = require('http')

const noop = () => { }

module.exports = () => {
  const server = http.createServer()

  let routeHandlers = []

  server.on('request', async (request, response) => {
    const handler = routeHandlers.find((handler) => {
      const { method, url: path } = request
      return handler.method === method && handler.path === path
    })
    if (handler) {
      await handler.handle(request, response)
    } else {
      response.statusCode = 404
    }
    response.end()
  })

  return {
    start: (port = 8080, callback = noop) => {
      server.listen(port, callback)
    },
    addRouteHandlers: (handlers) => {
      routeHandlers = handlers
    }
  }
}
