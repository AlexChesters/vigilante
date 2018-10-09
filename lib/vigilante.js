/**
 * Vigilante
 * @module vigilante
 */

const http = require('http')

const customRequest = require('./request')
const customResponse = require('./response')

const findMatchingRouteHandler = (request, handler) => {
  const defaultMethod = 'GET'

  const { method: requestMethod, url: requestPath } = request
  const { method: handlerMethod, path: handlerPath } = handler

  if (!handlerMethod) {
    return requestMethod === defaultMethod && requestPath === handlerPath
  }

  return handler.method === requestMethod && handler.path === requestPath
}

const noop = () => { }

/**
 * An array of functions which will be ran before your request handler.
 * @name Middleware
 * @function
 * @param {Request} - The request object.
 */

/**
 * Handler
 * @name Handler
 * @function
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 */

/**
 * Create an instance of Vigilante.
 * @param {Object[]} routeHandlers - An array of route handlers.
 * @param {string} routeHandlers[].path - The request path you wish to match this request against.
 * @param {Handler} routeHandlers[].handle - The function to run to handle the request. Use this to send a response.
 * @param {string} [routeHandlers[].method = GET] - The HTTP method you wish to match this request against.
 * @param {Middleware[]} [routeHandlers[].middlewares] - An array of Middleware functions to run.
 */
module.exports = (routeHandlers) => {
  const server = http.createServer()

  server.on('request', async (request, response) => {
    const req = customRequest(request)
    const res = customResponse(response)

    const matchingRouteHandler = routeHandlers.find(
      (handler) => findMatchingRouteHandler(request, handler)
    )

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
    /**
     * Starts the server
     * @param {Number} [port=8080] - The port to listen on.
     * @param {Function} [callback] - A function to be called when the server has successfully started
     */
    start: (port = 8080, callback = noop) => {
      server.listen(port, callback)
    }
  }
}
