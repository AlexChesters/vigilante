const fetch = require('node-fetch')

module.exports = [
  {
    path: '/',
    handle: (req, res) => {
      res.sendPlainText('Hello, world!')
    }
  },
  {
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
    path: '/debug',
    middlewares: [
      (req) => {
        const data = { headers: req.headers }
        req.locals.data = data
      }
    ],
    handle: (req, res) => {
      res.sendJSON(req.locals.data)
    }
  }
]
