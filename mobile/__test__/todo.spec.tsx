import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import {setupServer} from 'msw/node';

import TodoList from '../src/index';
import {todoMock} from './utils/todoMock';

const server = setupServer(
  todoMock.create,
  todoMock.findAll(),
  todoMock.doneTodo,
  todoMock.destroy,
);

beforeAll(() => server.listen());

afterEach(async () => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('TodoList Component', () => {
  test('It should be add new todo in View', async () => {
    const {getByTestId, getByText} = render(<TodoList />);
    const todoInput = await waitFor(() => getByTestId('todoInput'));
    const btnAddTodo = await waitFor(() => getByTestId('btnAddTodo'));
    const todoTitle = 'New todo item';

    fireEvent.changeText(todoInput, todoTitle);
    await waitFor(() => expect(todoInput).toHaveProp('value', todoTitle));

    fireEvent.press(btnAddTodo);

    await waitFor(() => expect(todoInput).toHaveProp('value', ''));
    await waitFor(() => expect(getByText(todoTitle)).toBeDefined());
  });

  test('It should not be add new todo with invalid value', async () => {
    const {getByTestId, findAllByTestId} = render(<TodoList />);
    const todoInput = await waitFor(() => getByTestId('todoInput'));
    const btnAddTodo = await waitFor(() => getByTestId('btnAddTodo'));
    const todoTitle = '';

    fireEvent.changeText(todoInput, todoTitle);
    await waitFor(() => expect(todoInput).toHaveProp('value', todoTitle));

    fireEvent.press(btnAddTodo);

    await expect(
      findAllByTestId('todoTitle', {timeout: 100}),
    ).rejects.toThrow();
  });

  test('It should be load initial todos on component render', async () => {
    server.use(
      todoMock.findAll([
        {
          id: 1,
          title: 'Todo 1',
        },
        {
          id: 2,
          title: 'Todo 2',
        },
      ]),
    );
    const {getAllByTestId} = render(<TodoList />);
    await waitFor(() => expect(getAllByTestId('todoTitle')).toHaveLength(2));
  });

  test('It should be done an todo', async () => {
    const {getByTestId, getByText} = render(<TodoList />);
    const todoInput = await waitFor(() => getByTestId('todoInput'));
    const btnAddTodo = await waitFor(() => getByTestId('btnAddTodo'));
    const todoTitle = 'An simple todo';

    fireEvent.changeText(todoInput, todoTitle);
    await waitFor(() => expect(todoInput).toHaveProp('value', todoTitle));
    fireEvent.press(btnAddTodo);
    await waitFor(() => expect(todoInput).toHaveProp('value', ''));
    await waitFor(() => {
      expect(getByText(todoTitle)).toBeDefined();
    });

    const btnDoneTodo = await waitFor(() => getByTestId('btnDoneTodo'));
    fireEvent.press(btnDoneTodo);
    await waitFor(() => {
      expect(getByText('completed')).toBeDefined();
    });
  });

  test('It should be delete an todo', async () => {
    const {getByTestId, getByText} = render(<TodoList />);
    const todoInput = await waitFor(() => getByTestId('todoInput'));
    const btnAddTodo = await waitFor(() => getByTestId('btnAddTodo'));
    const todoTitle = 'An simple todo';

    fireEvent.changeText(todoInput, todoTitle);
    await waitFor(() => expect(todoInput).toHaveProp('value', todoTitle));
    fireEvent.press(btnAddTodo);
    await waitFor(() => expect(todoInput).toHaveProp('value', ''));
    await waitFor(() => {
      expect(getByText(todoTitle)).toBeDefined();
    });

    const btnDeleteTodo = await waitFor(() => getByTestId('btnDeleteTodo'));
    fireEvent.press(btnDeleteTodo);
    await waitForElementToBeRemoved(() => getByTestId('todoTitle'));
  });
});
