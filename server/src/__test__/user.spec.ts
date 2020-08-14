import Database from '@Database'

beforeEach(async () => {
  await Database('todos').truncate()
})

test('It should be return an user', () => {
  const user = {
    name: 'david',
    age: 19
  }
  expect(user.name).toBe('david')
  expect(user.age).toBe(19)
  expect.assertions(2)
})
