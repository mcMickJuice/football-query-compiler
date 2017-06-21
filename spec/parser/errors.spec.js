const parser = require('parser')
const tokenBuilder = require('tokenizer/token-builders')
const QuerySyntaxError = require('parser/query-syntax-error')

test('should throw if no string literal provided', () => {
  //passing and rushing

  const tokens = [
    tokenBuilder.buildStatTypeToken('passing'),
    tokenBuilder.buildAndToken(),
    tokenBuilder.buildStatTypeToken('rushing')
  ]

  expect(() => parser(tokens)).toThrow(QuerySyntaxError)
})

test('should throw if no StatType is provided after And', () => {
  //passing and rushing

  const tokens = [
    tokenBuilder.buildStatTypeToken('passing'),
    tokenBuilder.buildAndToken(),
    tokenBuilder.buildStringLiteralToken('aaron')
  ]

  expect(() => parser(tokens)).toThrow(QuerySyntaxError)
  expect(() => parser(tokens)).toThrow(/Invalid Token after 'And' expected 'StatType'/)
})

test('should NOT throw error if consecutive stat types', () => {
  const tokens = [
    tokenBuilder.buildStatTypeToken('passing'),
    tokenBuilder.buildStatTypeToken('rushing'),
    tokenBuilder.buildForToken(),
    tokenBuilder.buildStringLiteralToken('aaron')
  ]

  expect(() => parser(tokens)).not.toThrow(QuerySyntaxError)
})

test('should throw error if no For block is provided', () => {
  const tokens = [
    tokenBuilder.buildStatTypeToken('passing'),
    tokenBuilder.buildStatTypeToken('rushing'),
    tokenBuilder.buildStringLiteralToken('aaron')
  ]

  expect(() => parser(tokens)).toThrow(QuerySyntaxError)
})