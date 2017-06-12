const parser = require('parser')

const {
  SelectStatement,
  StringLiteral,
  TimeRange,
  NumericLiteral
} = require('parser/node-types')

const {
  buildStringLiteralToken,
  buildInToken,
  buildNumericLiteralToken,
  buildAndToken,
  buildThroughToken
} = require('tokenizer/token-builders')

const subjectTokens = [
  buildStringLiteralToken('Aaron'),
  buildStringLiteralToken('Rodgers')
]

const subjectValue = 'Aaron Rodgers';

const baseQuery = {
  [SelectStatement]: {
    type: SelectStatement,
    subject: {
      type: StringLiteral,
      value: subjectValue
    }
  }
}

const mergeWithBase = obj => Object.assign({}, baseQuery, obj)

test('should return subject with time range', () => {
  const tokens = [
    ...subjectTokens,
    buildInToken(),
    buildNumericLiteralToken(2011)
  ]

  const result = parser(tokens);

  expect(result).toMatchObject(mergeWithBase({
    [TimeRange]: {
      type: TimeRange,
      rangeType: null,
      years: [
        { type: NumericLiteral, value: 2011 }
      ]
    }
  }))
})

test('should return subject with time range with And range', () => {
  const tokens = [
    ...subjectTokens,
    buildInToken(),
    buildNumericLiteralToken(2011),
    buildAndToken(),
    buildNumericLiteralToken(2012),
    buildAndToken(),
    buildNumericLiteralToken(2013),
  ]

  const result = parser(tokens);

  expect(result).toMatchObject(mergeWithBase({
    [TimeRange]: {
      type: TimeRange,
      rangeType: 'And',
      years: [
        { type: NumericLiteral, value: 2011 },
        { type: NumericLiteral, value: 2012 },
        { type: NumericLiteral, value: 2013 }
      ]
    }
  }))
})

test('should return subject with time range with Through range', () => {
  const tokens = [
    ...subjectTokens,
    buildInToken(),
    buildNumericLiteralToken(2011),
    buildThroughToken(),
    buildNumericLiteralToken(2016)
  ]

  const result = parser(tokens);

  expect(result).toMatchObject(mergeWithBase({
    [TimeRange]: {
      type: TimeRange,
      rangeType: 'Through',
      years: [
        { type: NumericLiteral, value: 2011 },
        { type: NumericLiteral, value: 2016 },
      ]
    }
  }))
})
