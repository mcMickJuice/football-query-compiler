const {
  SelectStatement,
  StatType,
  TimeRange,
  GroupingCriteria
} = require('../../parser/node-types')

const traverser = require('../../traverser')

function transformer(ast) {
  const resultObj = {}

  const visitor = {
    [SelectStatement]: node => {
      resultObj.subject = node.subject.value
    },
    [StatType]: node => {
      if(resultObj.statTypes == null) {
        resultObj.statTypes = []
      }

      resultObj.statTypes.push(node.value)
    },
    [TimeRange]: node => {
      resultObj.timeRange = {
        type: node.rangeType,
        years: node.years.map(y => y.value)
      }
    },
    [GroupingCriteria]: node => {
      resultObj.grouping = node.value
    }
  }

  traverser(ast, visitor)

  return resultObj
}

module.exports = transformer