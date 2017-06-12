const parser = require('parser')

test('should return an object', () => {
  const tokens = []

  const result = parser(tokens)

  expect(result).not.toBeUndefined()
})