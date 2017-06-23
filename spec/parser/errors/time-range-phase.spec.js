const parser = require('parser')
const tokenBuilder = require('tokenizer/token-builders')
const QuerySyntaxError = require('parser/query-syntax-error')

const baseTokens = [
  tokenBuilder.buildStringLiteralToken('aaron')
]

test('should throw QueryError if no token after In', () => {
  const tokens = [
    ...baseTokens,
    tokenBuilder.buildInToken()
  ]

  expect(() => parser(tokens)).toThrow(QuerySyntaxError)
  expect(() => parser(tokens)).toThrow(/Non numeric literal found in first position of timeRange/)
})

test('should throw QueryError if non integer token after In', () => {
  const tokens = [
    ...baseTokens,
    tokenBuilder.buildInToken(),
    tokenBuilder.buildStringLiteralToken('hello')
  ]

  expect(() => parser(tokens)).toThrow(QuerySyntaxError)
  expect(() => parser(tokens)).toThrow(/Non numeric literal found in first position of timeRange/)
})

test('should throw error if And and Through provided in same query', () => {
  const tokens = [
    ...baseTokens,
    tokenBuilder.buildInToken(),
    tokenBuilder.buildNumericLiteralToken(2008),
    tokenBuilder.buildThroughToken(),
    tokenBuilder.buildNumericLiteralToken(2016),
    tokenBuilder.buildAndToken(),
    tokenBuilder.buildNumericLiteralToken(2017)
  ]

  expect(() => parser(tokens)).toThrow(QuerySyntaxError)
  expect(() => parser(tokens)).toThrow(/Cannot use both Through and And Range types for timeRange/)
})