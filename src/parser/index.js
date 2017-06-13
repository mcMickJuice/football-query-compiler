const {
  StringLiteral,
  SelectStatement,
  StatType,
  TimeRange,
  NumericLiteral,
  GroupingCriteria
} = require('./node-types')

const tokenTypes = require('../tokenizer/token-types')

function parser(tokens) {
  if (tokens.length === 0) {
    throw new Error('No tokens provided to parser function')
  }

  const ast = {
    select: {
      type: SelectStatement
    }
  }

  let idx = 0;
  let current = tokens[idx]

  //stat type mode
  //query starts with Stat Type
  if (current.type === tokenTypes.StatType) {
    const statTypeStrings = []
    while (current.type === tokenTypes.StatType) {
      statTypeStrings.push(current.value)

      current = tokens[++idx];
      if (current.type === tokenTypes.And) {
        current = tokens[++idx]
      }

      if (current != null && current.type === tokenTypes.For) {
        current = tokens[++idx]
        break;
      }
    }

    ast.select.statTypes = statTypeStrings.map(value => ({
      type: StatType,
      value
    }))
  }

  //Subject mode
  let subjectString = ''
  while (current && current.type === tokenTypes.StringLiteral) {
    subjectString += current.value + ' ';
    current = tokens[++idx]
  }

  ast.select.subject = {
    type: StringLiteral,
    value: subjectString.trim()
  }

  // time range mode
  if (current && current.type === tokenTypes.In) {
    //skip the in
    current = tokens[++idx]
    const yearRawValues = []
    if (current == null || current.type !== tokenTypes.NumericLiteral) {
      throw new Error('Non numeric literal found in first position of timeRange')
    }

    //WOOF
    let rangeType = null;
    while (current && current.type === tokenTypes.NumericLiteral) {
      yearRawValues.push(current.value)
      current = tokens[++idx];

      if (current && current.type === tokenTypes.And) {
        if (rangeType === 'Through') {
          throw new Error('Cannot use both Through and And Range types for timeRange')
        }
        rangeType = 'And'
        current = tokens[++idx]
      } else if (current && current.type === tokenTypes.Through) {
        if (rangeType === 'And') {
          throw new Error('Cannot use both Through and And Range types for timeRange')
        }
        rangeType = 'Through'
        current = tokens[++idx]
      }
    }

    ast.timeRange = {
      type: TimeRange,
      rangeType,
      years: yearRawValues.map(value => ({
        type: NumericLiteral,
        value
      }))
    }
  }

  //Grouping mode
  if (current && current.type === tokenTypes.By) {
    //skip the by
    current = tokens[++idx]
    if (current == null || current.type !== tokenTypes.Grouping) {
      throw new Error('grouping value not provided for GroupingCriteria')
    }

    const groupingValue = current.value;

    ast.grouping = {
      type: GroupingCriteria,
      value: groupingValue
    }
  }

  return ast;
}

module.exports = parser