/**
 * 
 {
   subject: string,
   statTypes: string[],
   timeRange: {type: 'Through', years: int[]} | {type: 'And', years: int[]} | {type: null, years: int[]}
   grouping: string
 } 
 */

function statTypeString(obj) {
  if (obj.statTypes != null) {
    const statString = obj.statTypes.join(' and ');
    return `for ${statString}`
  }

  return 'for player\'s position\'s primary stat'
}

function timeRangeString(obj) {
  let str = 'for career'
  if (obj.timeRange != null) {
    const years = obj.timeRange.years
    if (obj.timeRange.type === 'Through') {
      str = `from season ${years[0]} to ${years[1]}`
    } else if (obj.timeRange.type === 'And') {
      str = 'for seasons ' + years.join(' and ');
    } else {
      str = `for the ${years[0]} season`
    }
  }

  return str
}

function groupingString(obj) {
  if (obj.grouping != null) {
    return `by ${obj.grouping}`
  }

  return 'by season';
}

function buildInlineWithLast(delimiter) {
  return (val, isLast) => isLast ? val : `${val}${delimiter}`
}

function buildDelimiter(delimiter) {
  let delimiterFunc;
  if (delimiter == null) {
    delimiterFunc = buildInlineWithLast(' ')
  } else if (typeof delimiter === 'function') {
    delimiterFunc = delimiter
  } else {
    delimiterFunc = buildInlineWithLast(delimiter)
  }

  return delimiterFunc;
}

function codeTransformer(obj, delimiter) {
  let queryStr = '';

  const applyDelimiter = buildDelimiter(delimiter);

  //subject
  queryStr += applyDelimiter(obj.subject);

  //stat types
  queryStr += applyDelimiter(statTypeString(obj))

  //time range
  queryStr += applyDelimiter(timeRangeString(obj))

  //time grouping
  queryStr += applyDelimiter(groupingString(obj), true)

  return queryStr;
}

module.exports = codeTransformer