import { assert } from 'chai'
import Database from '@Database'
import client from './utils/client'

beforeEach(async () => {
  await Database('todos').truncate()
})

test('It should be create a new todo', async () => {
  const TODO_TITLE = 'David'
  const response = await client.post('/todos')
    .send({
      title: TODO_TITLE
    })
  expect(response.status).toEqual(201)
  assert.propertyVal(response.body, 'id', 1)
  assert.propertyVal(response.body, 'title', TODO_TITLE)
  assert.propertyVal(response.body, 'completed', false)
})

test('It should be list all todos', async () => {
  const todosFake = [
    { title: 'Todo 1', completed: false },
    { title: 'Todo 2', completed: true },
    { title: 'Todo 3', completed: false },
    { title: 'Todo 4', completed: false },
    { title: 'Todo 5', completed: true }
  ]

  const [todoId0] = await Database('todos')
    .insert(todosFake[0])
  const [todoId1] = await Database('todos')
    .insert(todosFake[1])
  const [todoId2] = await Database('todos')
    .insert(todosFake[2])
  const [todoId3] = await Database('todos')
    .insert(todosFake[3])
  const [todoId4] = await Database('todos')
    .insert(todosFake[4])

  const ids = [todoId0, todoId1, todoId2, todoId3, todoId4]

  const todos = todosFake.map((tFake, i) => ({ ...tFake, id: ids[i] }))
  const response = await client.get('/todos')
  expect(response.status).toEqual(200)
  assert.isArray(response.body)
  assert.deepEqual(todos, response.body)
})

test('It should be complete a todo', async () => {
  const todo = {
    title: 'Todo 1'
  }
  const [todoId] = await Database('todos')
    .insert(todo)

  const response = await client.patch(`/todos/${todoId}/complete`)
  expect(response.status).toEqual(200)
  assert.propertyVal(response.body, 'id', todoId)
  assert.propertyVal(response.body, 'title', todo.title)
  assert.propertyVal(response.body, 'completed', true)
})

test('It should be not complete a todo that not exist', async () => {
  const response = await client.patch(`/todos/${38}/complete`)
  expect(response.status).toEqual(400)
  assert.propertyVal(response.body, 'error', 'EntityNotFound')
  assert.propertyVal(response.body, 'message', 'Todo with id 38 not found')
})

test('It should be not complete a todo that already completed', async () => {
  const [todoId] = await Database('todos')
    .insert({
      title: 'Todo already completed',
      completed: 1
    })
  const response = await client.patch(`/todos/${todoId}/complete`)
  expect(response.status).toEqual(400)
  assert.propertyVal(response.body, 'error', 'TodoAlreadyCompleted')
  assert.propertyVal(response.body, 'message', `Todo with id: ${todoId} already completed`)
})

test('It should be delete a todo', async () => {
  const [todoId] = await Database('todos')
    .insert({
      title: 'Todo already completed',
      completed: 1
    })
  const response = await client.delete(`/todos/${todoId}`)
  expect(response.status).toEqual(200)
})

test('It should be not delete a todo that not exists', async () => {
  const response = await client.delete('/todos/38')
  expect(response.status).toEqual(400)
  assert.propertyVal(response.body, 'error', 'EntityNotFound')
  assert.propertyVal(response.body, 'message', 'Todo with id 38 not found')
})
