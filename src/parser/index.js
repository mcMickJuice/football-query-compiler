const {
  StringLiteral,
  SelectStatement,
  StatType,
  TimeRange,
  NumericLiteral,
  GroupingCriteria,
  Program
} = require('./node-types')
const QuerySyntaxError = require('./query-syntax-error')

const tokenTypes = require('../tokenizer/token-types')

const statTypePhaseTokens = [
  tokenTypes.StatType,
  tokenTypes.And,
  tokenTypes.For
]
function isInvalidStatTypePhaseToken(token) {
  return statTypePhaseTokens.indexOf(token.type) === -1
}

function parser(tokens) {
  if (tokens.length === 0) {
    throw new Error('No tokens provided to parser function')
  }

  const bodyNodes = []

  let idx = 0;
  let current = tokens[idx]

  //stat type mode
  //query starts with Stat Type
  const select = {
    type: SelectStatement
  }
  if (current.type === tokenTypes.StatType) {
    const statTypeStrings = []
    while (current != null) {
      if (isInvalidStatTypePhaseToken(current)) {
        throw new QuerySyntaxError(`Parser Error: Invalid token type ${current.type} provided in StatType Phase`)
      }

      if (current.type === tokenTypes.StatType) {
        statTypeStrings.push(current.value)
        current = tokens[++idx];
        continue;
      }

      if (current.type === tokenTypes.And) {
        current = tokens[++idx]
        if (current.type !== tokenTypes.StatType) {
          throw new QuerySyntaxError('Parser Error: Invalid Token after \'And\' expected \'StatType\'')
        }
        continue
      }

      if (current.type === tokenTypes.For) {
        current = tokens[++idx]
        break;
      }
    }

    select.statTypes = statTypeStrings.map(value => ({
      type: StatType,
      value
    }))
  }

  //Subject mode
  if (current == null || current.type !== tokenTypes.StringLiteral) {
    throw new QuerySyntaxError('Parser Error: No Query Subject provided')
  }

  let subjectString = ''
  while (current && current.type === tokenTypes.StringLiteral) {
    subjectString += current.value + ' ';
    current = tokens[++idx]
  }

  select.subject = {
    type: StringLiteral,
    value: subjectString.trim()
  }

  bodyNodes.push(select)

  // time range mode
  if (current && current.type === tokenTypes.In) {
    //skip the in
    current = tokens[++idx]
    const yearRawValues = []
    if (current == null || current.type !== tokenTypes.NumericLiteral) {
      throw new QuerySyntaxError('Parser Error: Non numeric literal found in first position of timeRange')
    }

    //WOOF
    let rangeType = null;
    while (current && current.type === tokenTypes.NumericLiteral) {
      yearRawValues.push(current.value)
      current = tokens[++idx];

      if (current && current.type === tokenTypes.And) {
        if (rangeType === 'Through') {
          throw new QuerySyntaxError('Parser Error: Cannot use both Through and And Range types for timeRange')
        }
        rangeType = 'And'
        current = tokens[++idx]
      } else if (current && current.type === tokenTypes.Through) {
        if (rangeType === 'And') {
          throw new QuerySyntaxError('Parser Error: Cannot use both Through and And Range types for timeRange')
        }
        rangeType = 'Through'
        current = tokens[++idx]
      }
    }

    bodyNodes.push({
      type: TimeRange,
      rangeType,
      years: yearRawValues.map(value => ({
        type: NumericLiteral,
        value
      }))
    })
  }

  //Grouping mode
  if (current && current.type === tokenTypes.By) {
    //skip the by
    current = tokens[++idx]
    if (current == null || current.type !== tokenTypes.Grouping) {
      throw new QuerySyntaxError('Parser Error: grouping value not provided for GroupingCriteria')
    }

    const groupingValue = current.value;

    bodyNodes.push({
      type: GroupingCriteria,
      value: groupingValue
    })

    current = tokens[++idx]
  }


  if (current != null) {
    //unhandledd tokens....throw
    throw new QuerySyntaxError('Parser Error: unhandled tokens at end of query')
  }

  const ast = {
    type: Program,
    body: bodyNodes
  }

  return ast;
}

module.exports = parser