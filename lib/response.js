/**
* Response object
* @name Response
* @type object
* @property {Object} locals - key/value pairs that you can read and write too (e.g. for setting a value which you can use in the request handler)
* @property {Object} headers - read-only copy of the request headers. Any attempt to modify the headers will fail silently
*/
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
