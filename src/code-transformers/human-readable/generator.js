/**
 * 
 {
   subject: string,
   statTypes: string[],
   timeRange: {type: 'Through', years: int[]} | {type: 'And', years: int[]} | {type: null, years: int[]}
   grouping: string
 } 
 */
const defaultDelimiter = ' ';

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

function codeTransformer(obj, delimiter = defaultDelimiter) {
  let queryStr = 'Query stats for ';

  //subject
  queryStr += obj.subject;

  //stat types
  queryStr += `${delimiter}${statTypeString(obj)}`

  //time range
  queryStr += `${delimiter}${timeRangeString(obj)}`

  //time grouping
  queryStr += `${delimiter}${groupingString(obj)}`

  return queryStr;
}

module.exports = codeTransformer