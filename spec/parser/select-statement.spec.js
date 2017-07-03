const {
  StringLiteral,
  SelectStatement,
  StatType,
  Program
} = require('parser/node-types')

const parser = require('parser')
const {
  buildStringLiteralToken,
  buildAndToken,
  buildStatTypeToken,
  buildForToken
} = require('lexer/token-builders')

test('should return SelectStatement AST with player query', () => {
  const tokens = [
    buildStringLiteralToken('Aaron'),
    buildStringLiteralToken('Rodgers')
  ]

  const result = parser(tokens)

  expect(result).toMatchObject({
    type: Program,
    body: [{
      type: SelectStatement,
      subject: {
        type: StringLiteral,
        value: 'Aaron Rodgers'
      }
    }]
  })
})

test('should return SelectStatement and one StatType', () => {
  const tokens = [
    buildStatTypeToken('passing'),
    buildForToken(),
    buildStringLiteralToken('Aaron Rodgers')
  ];

  const result = parser(tokens)

  expect(result).toMatchObject({
    type: Program,
    body: [{
      type: SelectStatement,
      subject: {
        type: StringLiteral,
        value: 'Aaron Rodgers'
      },
      statTypes: [
        {
          type: StatType,
          value: 'passing'
        }
      ]
    }]
  })
})

test('should return SelectStatement and multiple stat types', () => {
  const tokens = [
    buildStatTypeToken('passing'),
    buildAndToken(),
    buildStatTypeToken('rushing'),
    buildForToken(),
    buildStringLiteralToken('Aaron Rodgers')
  ];

  const result = parser(tokens)

  expect(result).toMatchObject({
    type: Program,
    body: [{
      type: SelectStatement,
      subject: {
        type: StringLiteral,
        value: 'Aaron Rodgers'
      },
      statTypes: [
        {
          type: StatType,
          value: 'passing'
        },
        {
          type: StatType,
          value: 'rushing'
        }
      ]
    }]
  })
})