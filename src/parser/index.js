const {
  StringLiteral,
  SelectStatement,
  StatType,
  TimeRange,
  NumericLiteral,
  GroupingCriteria,
  GroupingValue
} = require('./node-types')

const tokenTypes = require('../tokenizer/token-types')

function parser(tokens) {
  const ast = {
    select: {
      type: SelectStatement
    }
  }

  let idx = 0;
  let subjectString = ''

  //is this while loop necessary?  We're already listing this stuff sequentially
  while (idx < tokens.length) {
    let current = tokens[idx]

    //stat type mode
    if (current.type === tokenTypes.StatType) {
      const statTypeStrings = []
      while (current.type === tokenTypes.StatType) {
        statTypeStrings.push(current.value)

        current = tokens[++idx];
        if (current.type === tokenTypes.And) {
          current = tokens[++idx]
        }
      }

      ast.select.statTypes = statTypeStrings.map(value => ({
        type: StatType,
        value
      }))
    }

    //Subject mode
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
      if (current.type !== tokenTypes.NumericLiteral) {
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
        grouping: {
          type: GroupingValue,
          value: groupingValue
        }
      }
    }

    idx++;
  }

  return ast;
}

module.exports = parser