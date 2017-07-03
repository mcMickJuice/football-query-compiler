const statTypes = [
  'passing',
  'rushing',
  'receiving',
  'defensive'
]

const groupingTypes = [
  'year',
  'week'
]

const andKeyword = 'and'
const forKeyword = 'for'
const throughKeyword = 'through'
const inKeyword = 'in'
const byKeyword = 'by'

module.exports.isAnd = function isAnd(str) {
  return andKeyword === str.toLowerCase();
}

module.exports.isFor = function isFor(str) {
  return forKeyword === str.toLowerCase();
}

module.exports.isThrough = function isThrough(str) {
  return throughKeyword === str.toLowerCase();
}

module.exports.isStatType = function isStatType(str) {
  return statTypes.indexOf(str.toLowerCase()) > -1
}

module.exports.isNumber = function isNumber(str) {
  const number = Number(str);

  return !isNaN(number);
}

module.exports.isIn = function isIn(str) {
  return inKeyword === str.toLowerCase();
}

module.exports.isBy = function isBy(str) {
  return byKeyword === str.toLowerCase();
}

module.exports.isGrouping = function isGrouping(str) {
  return groupingTypes.indexOf(str.toLowerCase()) > -1 
}