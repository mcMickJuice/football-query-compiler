const {
  SelectStatement,
  StringLiteral
} = require('parser/node-types')

const {
  buildStringLiteralToken
} = require('tokenizer/token-builders')


const subjectValue = 'Aaron Rodgers';

const baseQuery = {
  select: {
    type: SelectStatement,
    subject: {
      type: StringLiteral,
      value: subjectValue
    }
  }
}

module.exports.subjectTokens = [
  buildStringLiteralToken('Aaron'),
  buildStringLiteralToken('Rodgers')
]

module.exports.mergeWithBase = obj => Object.assign({}, baseQuery, obj)