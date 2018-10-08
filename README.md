# vigilante
A minimalist web server for Node.js

# Usage
```javascript
const vigilante = require('vigilante')

const routeHandlers = [
  {
    method: 'GET',
    path: '/',
    handle: (_, res) => {
      res.sendPlainText('Hello, world!')
    }
  }
]

const server = vigilante(routeHandlers)

server.start(
  8080,
  () => { console.log('my server is running') }
)
```

# API
## `vigilante`
`require('vigilante')` exports a function which returns an object

#### Constructor
`const vigilante = require('vigilante')`

`const server = vigilante(routeHandlers)`

`routeHandlers` must be an array of `RouteHandler`s.

`RouteHandler` is an object that must satisfy the following schema:
```javascript
{
  method: String,         // a valid HTTP method (e.g. GET, POST)
  path: String,           // the path to match against for this route handler - must
                          // begin with a leading slash
  handle: RequestHandler  // the function handler for this route 
}
```

`RequestHandler` is a function that will be given two parameters, `request` and
`response`. The `request` parameter is a
[`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage).
The `response` parameter is an object with the following properties exposed:
```javascript
{
  sendPlainText: (content: String, statusCode: <Number>) // sends a response
                                                         // back to the client
                                                         // as plain text
  sendJSON: (body: Object, statusCode: <Number>)         // sends a response
                                                         // back to the client
                                                         // as JSON
}
```
All status codes are optional and will default to 200 if not provided.

#### `start`
`start(port: <Number>, callback: <Function>)`

After calling this function the server will start, the port will default to 8080
and the callback is called once the server has started successfully.
