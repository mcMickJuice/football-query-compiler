const {
  StringLiteral,
  SelectStatement,
  StatType,
  TimeRange,
  NumericLiteral,
  GroupingCriteria,
  Program
} = require('../parser/node-types')

function traverser(ast, visitor) {
  function traverseNode(node) {
    const fn = visitor[node.type];

    if (fn != null) {
      fn(node)
    }

    switch (node.type) {
      case Program:
        traverseArray(node.body)
        break
      default:
        break
    }
  }

  function traverseArray(nodes) {
    nodes.forEach(node => traverseNode(node))
  }

  traverseNode(ast)
}

module.exports = traverser