/* eslint-env jest */
const findMatchingRouteHandler = require('./find-matching-route-handler')

describe('findMatchingRouteHandler', () => {
  describe('if no method is provided', () => {
    test('will default to GET', () => {
      const request = { method: 'GET', url: '/foo' }
      const handler = { path: '/foo' }

      expect(findMatchingRouteHandler(request, handler)).toEqual(true)
    })
  })
  describe('if a method is provided', () => {
    test('will match against the provided method', () => {
      const request = { method: 'POST', url: '/foo' }
      const handler = { method: 'POST', path: '/foo' }

      expect(findMatchingRouteHandler(request, handler)).toEqual(true)
    })
  })
})
