const generator = require('code-transformers/human-readable/generator')

const getBase = () => ({
  subject: 'Aaron Rodgers'
})

test('should contain subject name', () => {
  const obj = getBase();
  const result = generator(obj);

  expect(result.startsWith('Aaron Rodgers ')).toBe(true)
})


test('should contain stat types', () => {
  const obj = getBase()

  obj.statTypes = [
    'passing',
    'rushing'
  ]

  const result = generator(obj)

  expect(result).toContain('for passing and rushing')
})

test('should contain one stat type', () => {
  const obj = getBase()

  obj.statTypes = [
    'rushing'
  ]

  const result = generator(obj)

  expect(result).toContain('for rushing')
})

test('should contain default stat message if no stat types', () => {
  const obj = getBase()

  const result = generator(obj)

  expect(result).toContain('for player\'s position\'s primary stat')
})

test('should contain default time range if no time range provided', () => {
  const obj = getBase()

  const result = generator(obj)

  expect(result).toContain('for career')
})

test('should contain one year message if only one year provided in time range', () => {
  const obj = getBase()

  obj.timeRange = {
    type: null,
    years: [2009]
  }

  const result = generator(obj)

  expect(result).toContain('for the 2009 season')
})

test('should contain all years passed in if And is type', () => {
  const obj = getBase();

  obj.timeRange = {
    type: 'And',
    years: [2009, 2010, 2011]
  }

  const result = generator(obj)

  expect(result).toContain('for seasons 2009 and 2010 and 2011')
})

test('should contain from and to year if Through is type', () => {
  const obj = getBase()

  obj.timeRange = {
    type: 'Through',
    years: [2007, 2014]
  }

  const result = generator(obj)

  expect(result).toContain('from season 2007 to 2014')
})

test('should contain by season by default', () => {
  const obj = getBase()

  const result = generator(obj);

  expect(result).toContain('by season')
})

test('should contain by grouping value if provided', () => {
  const obj = getBase();

  obj.grouping = 'week'

  const result = generator(obj, '\r\n')

  expect(result).toContain('by week')
})

test('should allow for custom delimiter between each query part', () => {
  const obj = getBase();

  obj.statTypes = [2008, 2009]
  obj.grouping = 'week'

  const delimiter = '\r\n'
  const result = generator(obj, delimiter)

  expect(result).toContain(`for 2008 and 2009${delimiter}`)
  expect(result).toContain('by week')
})

test('should use space as default delimiter', () => {
  const obj = getBase();

  obj.statTypes = [2008, 2009]
  obj.grouping = 'week'

  const delimiter = ' '
  const result = generator(obj)

  expect(result).toContain(`for 2008 and 2009${delimiter}`)
  //should not apply to last
  expect(result).toContain('by week')
})

test('should accept custom delimiter function', () => {
  const obj = getBase();

  obj.statTypes = [2008, 2009]

  const delimiterFunc = val => `<p>${val}</p>`
  const result = generator(obj, delimiterFunc)

  expect(result.startsWith('<p>Aaron Rodgers</p>')).toBe(true)
  expect(result).toContain('<p>for 2008 and 2009</p>')
})