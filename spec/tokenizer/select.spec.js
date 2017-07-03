const lexer = require('lexer')
const { StringLiteral, StatType, And, For } = require('lexer/token-types')

test('should return an array', () => {
  const query = 'Aaron Rodgers';

  const tokens = lexer(query)

  expect(Array.isArray(tokens)).toBe(true)
})

test('should contain string literal if just player name passed in', () => {
  const query = 'Aaron Rodgers';

  const tokens = lexer(query);

  expect(tokens).toMatchObject([
    { type: StringLiteral, value: 'Aaron' },
    { type: StringLiteral, value: 'Rodgers' },
  ])
})

test('should return stat type', () => {
  const query = 'passing';

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { type: StatType, value: 'passing' }
  ])
})

test('should return stat type with and', () => {
  const query = 'passing and rushing';

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { value: 'passing', type: StatType },
    { type: And },
    { value: 'rushing', type: StatType },
  ])
})

test('should return stats with for', () => {
  const query = 'passing and rushing for';

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { value: 'passing', type: StatType },
    { type: And },
    { value: 'rushing', type: StatType },
    { type: For },
  ])
})

test('should return tokens for entire query', () => {
  const query = 'passing and rushing for Aaron Rodgers';

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { value: 'passing', type: StatType },
    { type: And },
    { value: 'rushing', type: StatType },
    { type: For },
    { value: 'Aaron', type: StringLiteral },
    { value: 'Rodgers', type: StringLiteral }
  ])
})