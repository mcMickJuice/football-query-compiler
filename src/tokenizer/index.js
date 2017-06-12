const builders = require('./token-builders')
const predicates = require('./token-predicates')

function tokenizerImpl(query) {
  const querySplit = query.split(' ')

  const tokens = []
  let idx = 0;
  let current = null
  let playerName = [];

  while (idx < querySplit.length) {
    current = querySplit[idx++];

    if (predicates.isStatType(current)) {
      const statTypeToken = builders.buildStatTypeToken(current)
      tokens.push(statTypeToken)
      continue;
    }

    if (predicates.isAnd(current)) {
      const andToken = builders.buildAndToken()
      tokens.push(andToken)
      continue;
    }

    if (predicates.isFor(current)) {
      const forToken = builders.buildForToken();
      tokens.push(forToken)
      continue;
    }

    if (predicates.isNumber(current)) {
      const numericLiteralToken = builders.buildNumericLiteralToken(current)
      tokens.push(numericLiteralToken)
      continue
    }

    if (predicates.isThrough(current)) {
      const throughToken = builders.buildThroughToken()
      tokens.push(throughToken)

      continue;
    }

    if(predicates.isIn(current)) {
      const inToken = builders.buildInToken()
      tokens.push(inToken)

      continue;
    }

    if(predicates.isBy(current)){
      const byToken = builders.buildByToken()
      tokens.push(byToken)

      continue
    }

    if(predicates.isGrouping(current)) {
      const groupingToken = builders.buildGroupingToken(current);
      tokens.push(groupingToken)

      continue
    }

    const stringLiteralToken = builders.buildStringLiteralToken(current)
    tokens.push(stringLiteralToken)
  }

  return tokens
}

module.exports = tokenizerImpl