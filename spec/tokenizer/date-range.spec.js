const lexer = require('lexer')
const { NumericLiteral, And, Through, In } = require('lexer/token-types')

test('should have In', () => {
  const query = 'in 2007';

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    {type: In},
    {type: NumericLiteral, value: 2007}
  ])
})

test('should have NumericLiteral', () => {
  const query = '2007';

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { type: NumericLiteral, value: 2007 }
  ])
})

test('should have NumericLiteral with And', () => {
  const query = '2007 and 2008';

  const tokens = lexer(query);

  expect(tokens).toMatchObject([
    { type: NumericLiteral, value: 2007 },
    { type: And },
    { type: NumericLiteral, value: 2008 },
  ])
})

test('should support through keyword', () => {
  const query = '2007 through 2015'

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { type: NumericLiteral, value: 2007 },
    { type: Through },
    { type: NumericLiteral, value: 2015 },
  ])
})