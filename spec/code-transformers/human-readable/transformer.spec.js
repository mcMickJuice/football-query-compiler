const transformer = require('code-transformers/human-readable/transformer')
const {
  SelectStatement,
  StringLiteral,
  Program,
  StatType,
  TimeRange,
  NumericLiteral
} = require('parser/node-types')

const getBase = () => ({
  type: Program,
  body: []
})

const getAaronRodgersSelect = () => ({
  type: SelectStatement,
  subject: {
    type: StringLiteral,
    value: 'Aaron Rodgers'
  }
})


test('should return an object', () => {
  const base = getBase()
  const result = transformer(base);

  expect(result).toMatchObject({})
})

test('should have subject property', () => {
  const ast = getBase();
  ast.body.push({
    type: SelectStatement,
    subject: {
      type: StringLiteral,
      value: 'Aaron Rodgers'
    }
  })
  const result = transformer(ast)

  expect(result).toMatchObject({
    subject: 'Aaron Rodgers'
  })
})

test('should have years of statTypes if provided', () => {
  const ast = getBase();
  const select = getAaronRodgersSelect();

  select.statTypes = [
    { type: StatType, value: 'passing' },
    { type: StatType, value: 'rushing' },
    { type: StatType, value: 'blocking' }
  ]

  ast.body.push(select)

  const result = transformer(ast)

  expect(result).toMatchObject({
    subject: 'Aaron Rodgers',
    statTypes: ['passing', 'rushing', 'blocking']
  })
})

test('should have timeRange type and years if provided', () => {
  const ast = getBase();
  const select = getAaronRodgersSelect();

  ast.body.push(select);

  const timeRange = {
    type: TimeRange,
    rangeType: 'Through',
    years: [{
      type: NumericLiteral,
      value: 2009
    },{
      type: NumericLiteral,
      value: 2010
    }
    ]
  }

  ast.body.push(timeRange)

  const result = transformer(ast)

  expect(result).toMatchObject({
    timeRange: {
      type: 'Through',
      years: [2009, 2010]
    }
  })
})