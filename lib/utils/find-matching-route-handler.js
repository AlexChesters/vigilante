module.exports = (request, handler) => {
  const defaultMethod = 'GET'

  const { method: requestMethod, url: requestPath } = request
  const { method: handlerMethod, path: handlerPath } = handler

  if (!handlerMethod) {
    return requestMethod === defaultMethod && requestPath === handlerPath
  }

  return handler.method === requestMethod && handler.path === requestPath
}
