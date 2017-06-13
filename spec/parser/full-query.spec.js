const parser = require('parser')

const {
  SelectStatement,
  StringLiteral,
  StatType,
  GroupingCriteria,
  TimeRange,
  NumericLiteral
} = require('parser/node-types')
const tokenBuilder = require('tokenizer/token-builders')

test('subject query with stats by year', () => {
  const tokens = [
    tokenBuilder.buildStatTypeToken('passing'),
    tokenBuilder.buildAndToken(),
    tokenBuilder.buildStatTypeToken('receiving'),
    tokenBuilder.buildForToken(),
    tokenBuilder.buildStringLiteralToken('aaron'),
    tokenBuilder.buildStringLiteralToken('rodgers'),
    tokenBuilder.buildByToken(),
    tokenBuilder.buildGroupingToken('year')
  ]

  const result = parser(tokens)

  expect(result).toMatchObject({
    select: {
      type: SelectStatement,
      subject: {
        type: StringLiteral,
        value: 'aaron rodgers'
      },
      statTypes: [
        { type: StatType, value: 'passing' },
        { type: StatType, value: 'receiving' },
      ]
    },
    grouping: {
      type: GroupingCriteria,
      value: 'year'
    }
  })
})

test('subject query for year range by week', () => {
  const tokens = [
    tokenBuilder.buildStringLiteralToken('aaron'),
    tokenBuilder.buildStringLiteralToken('rodgers'),
    tokenBuilder.buildInToken(),
    tokenBuilder.buildNumericLiteralToken(2008),
    tokenBuilder.buildAndToken(),
    tokenBuilder.buildNumericLiteralToken(2009),
    tokenBuilder.buildByToken(),
    tokenBuilder.buildGroupingToken('week')
  ]

  const result = parser(tokens)

  expect(result).toMatchObject({
    select: {
      type: SelectStatement,
      subject: {
        type: StringLiteral,
        value: 'aaron rodgers'
      }
    },
    timeRange: {
      type:TimeRange,
      rangeType: 'And',
      years: [
        {type: NumericLiteral, value: 2008},
        {type: NumericLiteral, value: 2009},
      ]
    },
    grouping: {
      type: GroupingCriteria,
      value: 'week'
    }
  })
})