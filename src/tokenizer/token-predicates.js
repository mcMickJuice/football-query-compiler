const statTypes = [
  'passing',
  'rushing',
  'receiving',
  'defensive'
]

const andKeyword = 'and'
const forKeyword = 'for'
const throughKeyword = 'through'

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