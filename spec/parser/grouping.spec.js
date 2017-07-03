const parser = require('parser')
const { mergeWithBase, subjectTokens } = require('./utility')
const { GroupingCriteria } = require('parser/node-types')
const { buildByToken, buildGroupingToken } = require('lexer/token-builders')

test('should return subject with grouping', () => {
  const tokens = [
    ...subjectTokens,
    buildByToken(),
    buildGroupingToken('year')
  ]

  const result = parser(tokens)

  expect(result).toMatchObject(mergeWithBase({
    type: GroupingCriteria,
    value: 'year'
  }))
})