module.exports = (request) => {
  request.locals = {}

  return {
    locals: request.locals,
    headers: Object.freeze(request.headers)
  }
}
