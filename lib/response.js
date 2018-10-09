/**
 * Send a plain text response.
 * @typedef {Function} SendPlainText
 * @param {String} content - The plain text response to send.
 * @param {Number} [statusCode = 200] - The HTTP status code to send.
 */

/**
  * Send a JSON response.
  * @typedef {Function} SendJSON
  * @param {String} content - The JSON-serializable object to send.
  * @param {Number} [statusCode = 200] - The HTTP status code to send.
  */

/**
* An object representing a HTTP response
* @typedef {Object} Response
* @property {SendPlainText} sendPlainText - Send a response as plain text.
* @property {SendJSON} sendJSON - Send a response as JSON.
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
