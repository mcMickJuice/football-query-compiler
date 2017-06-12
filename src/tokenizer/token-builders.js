const { StringLiteral,
  StatType,
  And,
  For,
  NumericLiteral,
  Through,
  In,
  By,
  Grouping } = require('./token-types')

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
    value: value.toLowerCase()
  }
}

module.exports.buildInToken = function buildInToken() {
  return {
    type: In
  }
}

module.exports.buildByToken = function buildByToken() {
  return {
    type: By
  }
}

module.exports.buildGroupingToken = function buildGroupingToken(value) {
  return {
    type: Grouping,
    value
  }
}