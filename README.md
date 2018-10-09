# vigilante
A minimalist web server for Node.js

# Usage
```javascript
const vigilante = require('vigilante')

const routeHandlers = [
  {
    method: 'GET',
    path: '/',
    middleware: [
      (req) => req.locals.message = 'Hello, world!'
    ]
    handle: (req, res) => {
      res.sendPlainText(req.locals.message)
    }
  }
]

const server = vigilante(routeHandlers)

server.start(
  8080,
  () => { console.log('my server is running') }
)
```

# Documentation
The documentation for Vigilante is available
[here](https://alexchesters.github.io/vigilante/).
