import React, { useState, useEffect } from 'react'
import './styles.css'
import TodoService, { Todo } from '../../services/TodoService'

const TodoList: React.FC = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    TodoService.index()
      .then((data) => setTodos(data))
  }, [])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!todo.trim()) {
      return
    }
    const createdTodo = await TodoService.store(todo)
    setTodos([...todos, createdTodo])
    setTodo('')
  }

  async function handleDoneTodo (todoId: number): Promise<void> {
    await TodoService.done(todoId)
    const newTodos = todos.map((currentTodo) => {
      if (currentTodo.id === todoId) {
        return {
          ...currentTodo,
          completed: true
        }
      }
      return currentTodo
    })
    setTodos(newTodos)
  }

  async function handleDeleteTodo (todoId: number): Promise<void> {
    await TodoService.destroy(todoId)
    const newTodos = todos.filter((currentTodo) => currentTodo.id !== todoId)
    setTodos(newTodos)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="to do coffee"
          data-testid="todo-input"
        />
        <button
          type="submit"
          data-testid="btn-add-todo"
        >
          Add Todo
        </button>
      </form>

      <ul
        data-testid="todo-list"
      >
        {todos.map((currentTodo) => (
          <li key={currentTodo.id}>
            <div className="todo-item" data-testid="todo-item">
              <p>{currentTodo.title}</p>
              {!currentTodo.completed ? (
                <>
                  <button
                    type="button"
                    data-testid="btn-done-todo"
                    onClick={() => handleDoneTodo(currentTodo.id)}
                  >
                    Done
                  </button>
                  <button
                    type="button"
                    data-testid="btn-delete-todo"
                    onClick={() => handleDeleteTodo(currentTodo.id)}
                  >
                    Delete
                  </button>
                </>
              ) : (<p data-testid="completed">completed</p>)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
