import TodoRepository from '../../repositories/TodoRepository'
import DeleteTodoUseCase from './DeleteTodoUseCase'
import DeleteTodoController from './DeleteTodoController'

const deleteTodoUseCase = new DeleteTodoUseCase(TodoRepository)
const deleteTodoController = new DeleteTodoController(deleteTodoUseCase)

export default deleteTodoController
