const {
  SelectStatement,
  TimeRange,
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
      case SelectStatement:
        traverseNode(node.subject)
        traverseArray(node.statTypes || [])
        break
      case TimeRange:
        traverseArray(node.years || [])
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