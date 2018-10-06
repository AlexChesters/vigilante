const vigilante = require('../index')()

vigilante.start(
  8080,
  () => { console.log('vigilante example server is running') }
)

vigilante.addRouteHandlers([
  {
    method: 'GET',
    path: '/foo',
    handle: (req, res) => {
      res.write('<h1>Hello, world!</h1>')
    }
  }
])
