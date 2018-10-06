const vigilante = require('../index')()

vigilante.start(
  8080,
  () => { console.log('vigilante example server is running') }
)
