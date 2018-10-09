module.exports = (request) => {
  request.locals = {}

  return {
    locals: request.locals,
    headers: request.headers
  }
}
