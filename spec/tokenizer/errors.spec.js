const lexer = require('lexer')

test('should throw Error if query is empty string', () => {
  expect(() => {
    lexer('')
  }).toThrow(/Lexer Error/)
})

test('should throw if trimmed query is empty string', () => {
  expect(() => {
    lexer('    ')
  }).toThrow(/Lexer Error/)
})

test('should throw if null query is provided', () => {
  expect(() => {
    lexer()
  }).toThrow(/Lexer Error/)
})