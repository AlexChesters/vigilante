const vigilante = require('../index')()

vigilante.addRouteHandlers([
  {
    method: 'GET',
    path: '/foo',
    handle: (req, res) => {
      res.write('<h1>Hello, world!</h1>')
    }
  }
])

vigilante.start(
  8080,
  () => { console.log('vigilante example server is running') }
)
