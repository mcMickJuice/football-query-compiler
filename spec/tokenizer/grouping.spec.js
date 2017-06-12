const tokenizer = require('tokenizer')
const { By, Grouping } = require('tokenizer/token-types')

test('should have keyword by', () => {
  const query = 'by'

  const tokens = tokenizer(query)

  expect(tokens).toMatchObject([
    { type: By }
  ])
})

test('should have grouping token of year', () => {
  const query = 'year'

  const tokens = tokenizer(query)

  expect(tokens).toMatchObject([
    { type: Grouping, value: 'year' }
  ])
})

test('should have grouping token of week', () => {
  const query = 'week'

  const tokens = tokenizer(query)

  expect(tokens).toMatchObject([
    { type: Grouping, value: 'week' }
  ])
})

test('should have all tokens', () => {
  const query = 'by week'

  const tokens = tokenizer(query)

  expect(tokens).toMatchObject([
    { type: By },
    { type: Grouping, value: 'week' }
  ])
})