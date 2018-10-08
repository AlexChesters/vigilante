const fetch = require('node-fetch')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handle: (_, res) => {
      res.sendPlainText('Hello, world!')
    }
  },
  {
    method: 'GET',
    path: '/foo',
    handle: async (_, res) => {
      const response = await fetch('https://www.reddit.com/hot.json')
      const data = await response.json()
      const foo = data.data.children.slice(0, 2)
      res.sendJSON(foo)
    }
  }
]
