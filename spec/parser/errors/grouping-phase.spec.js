const parser = require('parser')
const tokenBuilder = require('tokenizer/token-builders')
const QuerySyntaxError = require('parser/query-syntax-error')

test('should throw error if no token provided after by token', () => {
  const tokens = [
    tokenBuilder.buildStringLiteralToken(),
    tokenBuilder.buildByToken()
  ]

  expect(() => parser(tokens)).toThrow(QuerySyntaxError)
  expect(() => parser(tokens)).toThrow(/grouping value not provided for GroupingCriteria/)
})

test('should throw error if non grouping token provided after by token', () => {
  const tokens = [
    tokenBuilder.buildStringLiteralToken(),
    tokenBuilder.buildByToken(),
    tokenBuilder.buildStringLiteralToken()
  ]

  expect(() => parser(tokens)).toThrow(QuerySyntaxError)
  expect(() => parser(tokens)).toThrow(/grouping value not provided for GroupingCriteria/)
})