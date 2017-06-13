const traverser = require('traverser')
const {
  Program,
  SelectStatement,
  StatType,
  GroupingCriteria,
  TimeRange,
  StringLiteral,
  NumericLiteral
} = require('parser/node-types')


test('function accepts ast and visitor object', () => {
  traverser({}, {})
})

test('should be called on Program node', () => {
  const ast = {
    type: Program,
    body: []
  }

  const mockVisitor = jest.fn()

  const visitor = {
    [Program]: mockVisitor
  }

  traverser(ast, visitor)

  expect(mockVisitor.mock.calls.length).toBe(1)
})

test('should be called on SelectStatement', () => {
  const ast = {
    type: Program,
    body: [
      {
        type: SelectStatement,
        subject: {
          type: StringLiteral,
          value: 'hello'
        },
        statTypes: []
      }
    ]
  }

  const mockVisitor = jest.fn()
  const visitor = {
    [SelectStatement]: mockVisitor
  }

  traverser(ast, visitor);

  expect(mockVisitor.mock.calls.length).toBe(1)
})

test('should be called on StatType', () => {
  const ast = {
    type: Program,
    body: [
      {
        type: SelectStatement,
        subject: {
          type: StringLiteral,
          value: 'hello'
        },
        statTypes: [
          { type: StatType, value: 'passing' }
        ]
      }
    ]
  }

  const mockVisitor = jest.fn()
  const visitor = {
    [StatType]: mockVisitor
  }

  traverser(ast, visitor)

  expect(mockVisitor.mock.calls.length).toBe(1)
})

test('should be called on GroupingCriteria', () => {
  const ast = {
    type: Program,
    body: [
      {
        type: SelectStatement,
        subject: {
          type: StringLiteral,
          value: 'hello'
        }
      },
      {
        type: GroupingCriteria,
        value: 'week'
      }
    ]
  }

  const mockVisitor = jest.fn()
  const visitor = {
    [GroupingCriteria]: mockVisitor
  }

  traverser(ast, visitor)

  expect(mockVisitor.mock.calls.length).toBe(1)
})

test('should be called on TimeRange', () => {
  const ast = {
    type: Program,
    body: [
      {
        type: SelectStatement,
        subject: {
          type: StringLiteral,
          value: 'hello'
        }
      },
      {
        type: TimeRange,
        years: []
      }
    ]
  }

  const mockVisitor = jest.fn()

  const visitor = {
    [TimeRange]: mockVisitor
  }

  traverser(ast, visitor)

  expect(mockVisitor.mock.calls.length).toBe(1)
})

test('should be called on StringLiteral', () => {
  const ast = {
    type: Program,
    body: [
      {
        type: SelectStatement,
        subject: {
          type: StringLiteral,
          value: 'hello'
        }
      },
      {
        type: TimeRange,
        years: []
      }
    ]
  }

  const mockVisitor = jest.fn()

  const visitor = {
    [StringLiteral]: mockVisitor
  }

  traverser(ast, visitor)

  expect(mockVisitor.mock.calls.length).toBe(1)
})

test('should be called on NumericLiteral', () => {
  const ast = {
    type: Program,
    body: [
      {
        type: SelectStatement,
        subject: {
          type: StringLiteral,
          value: 'hello'
        }
      },
      {
        type: TimeRange,
        years: [
          { type: NumericLiteral, value: 2008 },
          { type: NumericLiteral, value: 2011 },
        ]
      }
    ]
  }

  const mockVisitor = jest.fn()

  const visitor = {
    [NumericLiteral]: mockVisitor
  }

  traverser(ast, visitor)

  expect(mockVisitor.mock.calls.length).toBe(2)
})