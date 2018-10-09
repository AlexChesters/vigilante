/**
 * An object representing a HTTP request
 * @typedef {Object} Request
 * @property {Object} locals - key/value pairs that you can read and write too
 * (e.g. for setting a value which you can use in later middleware or in the
 * request handler).
 * @property {Object} headers - read-only copy of the request headers. Any attempt to modify the headers will fail silently.
 */
module.exports = (request) => {
  request.locals = {}

  return {
    locals: request.locals,
    headers: Object.freeze(request.headers)
  }
}
