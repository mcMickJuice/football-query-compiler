const parser = require('parser')
const tokenBuilder = require('lexer/token-builders')
const QuerySyntaxError = require('parser/query-syntax-error')

test('should throw error if any tokens are at end of query', () => {
  const tokens = [
    tokenBuilder.buildStringLiteralToken('aaron'),
    tokenBuilder.buildStatTypeToken('passing')
  ]

  expect(() => parser(tokens)).toThrow(QuerySyntaxError)
  expect(() => parser(tokens)).toThrow(/unhandled tokens at end of query/)
})