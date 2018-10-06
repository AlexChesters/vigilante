const http = require('http')

const noop = () => { }

module.exports = () => {
  const server = http.createServer()

  server.on('request', (request, response) => {
    const { method, url } = request
    console.log(method, url)
    response.statusCode = 200
    response.end()
  })

  return {
    start: (port = 8080, callback = noop) => {
      server.listen(port, callback)
    }
  }
}
