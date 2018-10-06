module.exports = (response) => {
  return {
    sendPlainText: (content, statusCode = 200) => {
      response.statusCode = statusCode
      response.setHeader('Content-Type', 'text/plain')
      response.end(content)
    },
    sendJSON: (body, statusCode = 200) => {
      response.statusCode = statusCode
      response.setHeader('Content-Type', 'application/json')
      response.end(JSON.stringify(body))
    }
  }
}
