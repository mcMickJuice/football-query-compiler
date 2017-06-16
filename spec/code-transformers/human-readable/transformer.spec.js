//NOTE that this is more of an integration test than a unit test
//transformer takes an implicit dependency (its imported in the file) 
//on traverser.  We could instead inject the traverser into the transformer func...

const transformer = require('code-transformers/human-readable/transformer')
const {
  SelectStatement,
  StringLiteral,
  Program,
  StatType,
  TimeRange,
  NumericLiteral,
  GroupingCriteria
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

test('should have timeRange type through and years if provided', () => {
  const ast = getBase();
  const select = getAaronRodgersSelect();

  ast.body.push(select);

  const timeRange = {
    type: TimeRange,
    rangeType: 'Through',
    years: [{
      type: NumericLiteral,
      value: 2009
    }, {
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

test('should have timeRange type And and years if provided', () => {
  const ast = getBase();
  const select = getAaronRodgersSelect();

  ast.body.push(select);

  const timeRange = {
    type: TimeRange,
    rangeType: 'And',
    years: [{
      type: NumericLiteral,
      value: 2009
    }, {
      type: NumericLiteral,
      value: 2010
    },
    {
      type: NumericLiteral,
      value: 2012
    },
    {
      type: NumericLiteral,
      value: 2014
    }
    ]
  }

  ast.body.push(timeRange)

  const result = transformer(ast)

  expect(result).toMatchObject({
    timeRange: {
      type: 'And',
      years: [2009, 2010, 2012, 2014]
    }
  })
})

test('should have timeRange type And and years if provided', () => {
  const ast = getBase();
  const select = getAaronRodgersSelect();

  ast.body.push(select);

  const timeRange = {
    type: TimeRange,
    years: [{
      type: NumericLiteral,
      value: 2009
    }
    ]
  }

  ast.body.push(timeRange)

  const result = transformer(ast)

  expect(result).toMatchObject({
    timeRange: {
      years: [2009]
    }
  })
})

test('should have grouping with correct type', () => {
  const ast = getBase();
  ast.body.push(getAaronRodgersSelect())

  const grouping = {
    type: GroupingCriteria,
    value: 'week'
  }

  ast.body.push(grouping)

  const result = transformer(ast)

  expect(result).toMatchObject({
    grouping: 'week'
  })
})

test('should have representation of full query', () => {
  const ast = getBase();
  const select = getAaronRodgersSelect();
  select.statTypes = [
    { type: StatType, value: 'passing' },
    { type: StatType, value: 'rushing' },
    { type: StatType, value: 'receiving' },
  ]
  ast.body.push(select)

  const timeRange = {
    type: TimeRange,
    rangeType: 'Through',
    years: [
      { type: NumericLiteral, value: 2008 },
      { type: NumericLiteral, value: 2015 }
    ]
  }

  ast.body.push(timeRange)

  const grouping = {
    type: GroupingCriteria,
    value: 'week'
  }

  ast.body.push(grouping)

  const result = transformer(ast)

  expect(result).toMatchObject({
    subject: 'Aaron Rodgers',
    statTypes: ['passing', 'rushing', 'receiving'],
    timeRange: {
      type: 'Through',
      years: [2008, 2015]
    },
    grouping: 'week'
  })
})