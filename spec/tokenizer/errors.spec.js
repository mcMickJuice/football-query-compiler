const tokenizer = require('tokenizer')

test('should throw Error if query is empty string', () => {
  expect(() => {
    tokenizer('')
  }).toThrow(/Tokenizer Error/)
})

test('should throw if trimmed query is empty string', () => {
  expect(() => {
    tokenizer('    ')
  }).toThrow(/Tokenizer Error/)
})

test('should throw if null query is provided', () => {
  expect(() => {
    tokenizer()
  }).toThrow(/Tokenizer Error/)
})