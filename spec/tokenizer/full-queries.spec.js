const lexer = require('lexer')
const { StringLiteral,
  StatType,
  And,
  For,
  NumericLiteral,
  Through,
  In,
  By,
  Grouping } = require('lexer/token-types')

test('query by player name only', () => {
  const query = 'Aaron Rodgers'

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { type: StringLiteral, value: 'Aaron' },
    { type: StringLiteral, value: 'Rodgers' }
  ])
})

test('query by player name for specific stat type', () => {
  const query = 'Passing for Aaron Rodgers';

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { type: StatType, value: 'passing' },
    { type: For },
    { type: StringLiteral, value: 'Aaron' },
    { type: StringLiteral, value: 'Rodgers' }
  ])
})


test('query by player name for multiple stat types', () => {
  const query = 'Passing and rushing for Aaron Rodgers';

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { type: StatType, value: 'passing' },
    { type: And },
    { type: StatType, value: 'rushing' },
    { type: For },
    { type: StringLiteral, value: 'Aaron' },
    { type: StringLiteral, value: 'Rodgers' }
  ])
})

test('query by player name in a given year', () => {
  const query = 'Aaron Rodgers in 2007'

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { type: StringLiteral, value: 'Aaron' },
    { type: StringLiteral, value: 'Rodgers' },
    { type: In },
    { type: NumericLiteral, value: 2007 }
  ])
})

test('query by player name in multiple years', () => {
  const query = 'Aaron Rodgers in 2007 and 2008 and 2009'

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { type: StringLiteral, value: 'Aaron' },
    { type: StringLiteral, value: 'Rodgers' },
    { type: In },
    { type: NumericLiteral, value: 2007 },
    { type: And },
    { type: NumericLiteral, value: 2008 },
    { type: And },
    { type: NumericLiteral, value: 2009 }
  ])
})

test('query by player name with year range', () => {
  const query = 'Aaron Rodgers in 2007 through 2015'

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { type: StringLiteral, value: 'Aaron' },
    { type: StringLiteral, value: 'Rodgers' },
    { type: In },
    { type: NumericLiteral, value: 2007 },
    { type: Through },
    { type: NumericLiteral, value: 2015 },
  ])
})

test('query by player grouping by week', () => {
  const query = 'Aaron Rodgers by week'

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { type: StringLiteral, value: 'Aaron' },
    { type: StringLiteral, value: 'Rodgers' },
    { type: By },
    { type: Grouping, value: 'week' }
  ])
})

test('query by player grouping by year', () => {
  const query = 'Aaron Rodgers by year'

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { type: StringLiteral, value: 'Aaron' },
    { type: StringLiteral, value: 'Rodgers' },
    { type: By },
    { type: Grouping, value: 'year' }
  ])
})

test('query by player for stat types in date range by week', () => {
  const query = 'Passing and Receiving for Aaron Rodgers in 2008 through 2017 by week';

  const tokens = lexer(query)

  expect(tokens).toMatchObject([
    { type: StatType, value: 'passing' },
    { type: And },
    { type: StatType, value: 'receiving' },
    { type: For },
    { type: StringLiteral, value: 'Aaron' },
    { type: StringLiteral, value: 'Rodgers' },
    { type: In },
    { type: NumericLiteral, value: 2008 },
    { type: Through },
    { type: NumericLiteral, value: 2017 },
    { type: By },
    { type: Grouping, value: 'week' }
  ])
})