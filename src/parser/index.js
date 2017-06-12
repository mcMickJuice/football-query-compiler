const {
  StringLiteral,
  SelectStatement,
  StatType,
  TimeRange,
  NumericLiteral
} = require('./node-types')

const tokenTypes = require('../tokenizer/token-types')

function parser(tokens) {
  const ast = {
    [SelectStatement]: {
      type: SelectStatement
    }
  }

  let idx = 0;
  let subjectString = ''

  while (idx < tokens.length) {
    let current = tokens[idx]

    if (current.type === tokenTypes.StatType) {
      //build up stat types
      const statTypeStrings = []
      while (current.type === tokenTypes.StatType) {
        statTypeStrings.push(current.value)

        current = tokens[++idx];
        if (current.type === tokenTypes.And) {
          current = tokens[++idx]
        }
      }

      ast[SelectStatement].statTypes = statTypeStrings.map(value => ({
        type: StatType,
        value
      }))
    }

    while (current && current.type === tokenTypes.StringLiteral) {
      subjectString += current.value + ' ';
      current = tokens[++idx]
    }

    ast[SelectStatement].subject = {
      type: StringLiteral,
      value: subjectString.trim()
    }

    if (current && current.type === tokenTypes.In) {
      // time range mode
      //skip the for
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

      ast[TimeRange] = {
        type: TimeRange,
        rangeType,
        years: yearRawValues.map(value => ({
          type: NumericLiteral,
          value
        }))
      }
    }



    idx++;
  }

  return ast;
}

module.exports = parser