import CreateTodoController from './CreateTodoController'
import CreateTodoUseCase from './CreateTodoUseCase'
import TodoRepository from '../../repositories/TodoRepository'

const TodoUseCase = new CreateTodoUseCase(TodoRepository)
const TodoController = new CreateTodoController(TodoUseCase)

export default TodoController
