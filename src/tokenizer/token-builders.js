const { StringLiteral, StatType, And, For, NumericLiteral, Through } = require('./token-types')

module.exports.buildThroughToken = function buildThroughToken() {
  return {
    type: Through
  }
}

module.exports.buildNumericLiteralToken = function buildNumericLiteralToken(value) {
  return {
    type: NumericLiteral,
    value: Number(value)
  }
}

module.exports.buildAndToken = function buildAndToken() {
  return {
    type: And
  }
}

module.exports.buildForToken = function buildForToken() {
  return {
    type: For
  }
}

module.exports.buildStringLiteralToken = function buildStringLiteralToken(value) {
  return {
    type: StringLiteral,
    value
  }
}

module.exports.buildStatTypeToken = function buildStatTypeToken(value) {
  return {
    type: StatType,
    value
  }
}