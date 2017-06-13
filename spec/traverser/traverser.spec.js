const traverser = require('traverser')
const {
  Program
} = require('parser/node-types')


test('function accepts ast and visitor object', () => {
  traverser({},{})
})

test('should be called on Program node', () => {
  const ast = {
    type: Program,
    body: []
  }

  const mockVisitor = jest.fn()

  const visitor = {
    [Program]: mockVisitor
  }

  traverser(ast, visitor)

  expect(mockVisitor.mock.calls.length).toBe(1)
})