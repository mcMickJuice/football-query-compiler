class QuerySyntaxError extends Error {
  constructor(message) {
    super()
    this.name = 'QuerySyntaxError'
    this.message = message || 'Syntax Error'
    this.stack = (new Error()).stack
  }
}

module.exports = QuerySyntaxError