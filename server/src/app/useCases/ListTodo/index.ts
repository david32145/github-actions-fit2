import TodoRepository from '../../repositories/TodoRepository'
import ListTodoUseCase from './ListTodoUseCase'
import ListTodoController from './ListTodoController'

const UseCase = new ListTodoUseCase(TodoRepository)
const Controller = new ListTodoController(UseCase)

export default Controller
