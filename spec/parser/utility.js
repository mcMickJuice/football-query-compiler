const {
  SelectStatement,
  StringLiteral,
  Program
} = require('parser/node-types')

const {
  buildStringLiteralToken
} = require('tokenizer/token-builders')


const subjectValue = 'Aaron Rodgers';

const baseQuery = {
  type: Program,
  body: [{
    type: SelectStatement,
    subject: {
      type: StringLiteral,
      value: subjectValue
    }
  }]
}

module.exports.subjectTokens = [
  buildStringLiteralToken('Aaron'),
  buildStringLiteralToken('Rodgers')
]

module.exports.mergeWithBase = obj => {
  return Object.assign({}, baseQuery, {
    body: [...baseQuery.body, obj]
  })
}