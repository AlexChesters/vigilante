module.exports = (request) => {
  request.local = {}

  return {
    setLocal: (key, value) => {
      request.local[key] = value
    },
    getLocal: (key) => request.local[key]
  }
}
