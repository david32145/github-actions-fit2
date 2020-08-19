import React from 'react'
import {
  render, fireEvent, waitFor, cleanup, act, waitForElementToBeRemoved
} from '@testing-library/react'
import { setupServer } from 'msw/node'

import TodoList from '../src/components/TodoList'
import { todoMock } from './utils/todoMock'

const server = setupServer(
  todoMock.create,
  todoMock.findAll(),
  todoMock.doneTodo,
  todoMock.destroy
)

beforeAll(() => server.listen())

afterEach(async () => {
  server.resetHandlers()
  await cleanup()
})

afterAll(() => server.close())

describe('TodoList Component', () => {
  test('It should be add new todo in DOM', async () => {
    const { getByTestId, getByText } = render(<TodoList />)
    const todoInput = await waitFor(() => getByTestId('todo-input'))
    const btnAddTodo = await waitFor(() => getByTestId('btn-add-todo'))
    const todoTitle = 'An simple todo'
    fireEvent.change(todoInput, {
      target: {
        value: todoTitle
      }
    })
    expect(todoInput).toHaveValue(todoTitle)
    fireEvent.click(btnAddTodo)
    await waitFor(() => {
      expect(todoInput).toHaveValue('')
    })
    await waitFor(() => {
      expect(getByText(todoTitle)).toBeDefined()
    })
  })

  test('It should not be add new todo if input is invalid', async () => {
    const { getByTestId, findAllByTestId } = render(<TodoList />)
    const todoInput = await waitFor(() => getByTestId('todo-input'))
    const btnAddTodo = await waitFor(() => getByTestId('btn-add-todo'))
    const todoTitle = ''
    fireEvent.change(todoInput, {
      target: {
        value: todoTitle
      }
    })
    expect(todoInput).toHaveValue(todoTitle)
    act(() => {
      fireEvent.click(btnAddTodo)
    })
    await expect(findAllByTestId('todo-item', {}, {
      timeout: 100
    })).rejects.toThrow()
  })

  test('It should be load initial todos on component render', async () => {
    server.use(todoMock.findAll([{
      id: 1,
      title: 'Todo 1'
    }, {
      id: 2,
      title: 'Todo 2'
    }]))
    const { getAllByTestId } = render(<TodoList />)
    await waitFor(() => expect(getAllByTestId('todo-item')).toHaveLength(2))
  })

  test('It should be done an todo', async () => {
    const { getByTestId, getByText } = render(<TodoList />)
    const todoInput = await waitFor(() => getByTestId('todo-input'))
    const btnAddTodo = await waitFor(() => getByTestId('btn-add-todo'))
    const todoTitle = 'An simple todo'
    fireEvent.change(todoInput, {
      target: {
        value: todoTitle
      }
    })
    expect(todoInput).toHaveValue(todoTitle)
    fireEvent.click(btnAddTodo)
    await waitFor(() => {
      expect(todoInput).toHaveValue('')
    })
    await waitFor(() => {
      expect(getByText(todoTitle)).toBeDefined()
    })
    const btnDoneTodo = await waitFor(() => getByTestId('btn-done-todo'))
    fireEvent.click(btnDoneTodo)
    await waitFor(() => {
      expect(getByText('completed')).toBeDefined()
    })
  })

  test('It should be delete an todo', async () => {
    const { getByTestId, getByText } = render(<TodoList />)
    const todoInput = await waitFor(() => getByTestId('todo-input'))
    const btnAddTodo = await waitFor(() => getByTestId('btn-add-todo'))
    const todoTitle = 'An simple todo'
    fireEvent.change(todoInput, {
      target: {
        value: todoTitle
      }
    })
    expect(todoInput).toHaveValue(todoTitle)
    fireEvent.click(btnAddTodo)
    await waitFor(() => {
      expect(todoInput).toHaveValue('')
    })
    await waitFor(() => {
      expect(getByText(todoTitle)).toBeDefined()
    })
    const btnDeleteTodo = await waitFor(() => getByTestId('btn-delete-todo'))
    fireEvent.click(btnDeleteTodo)
    await waitForElementToBeRemoved(() => getByTestId('todo-item'))
  })
})
