const fetch = require('node-fetch')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handle: (req, res) => {
      res.sendPlainText('Hello, world!')
    }
  },
  {
    method: 'GET',
    path: '/reddit',
    middlewares: [
      async (req) => {
        const response = await fetch('https://www.reddit.com/hot.json')
        const data = await response.json()
        const firstThreeItems = data.data.children.slice(0, 2)
        req.locals.data = firstThreeItems
      }
    ],
    handle: (req, res) => {
      res.sendJSON(req.locals.data)
    }
  },
  {
    method: 'GET',
    path: '/debug',
    middlewares: [
      async (req) => {
        const data = { headers: req.headers }
        req.locals.data = data
      }
    ],
    handle: (req, res) => {
      res.sendJSON(req.locals.data)
    }
  }
]
