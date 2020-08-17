import { CompleteTodoController } from './CompleteTodoController'
import { CompleteTodoUseCase } from './CompleteTodoUseCase'
import TodoRepository from '../../repositories/TodoRepository'

const completeTodoUseCase = new CompleteTodoUseCase(TodoRepository)
const completeTodoController = new CompleteTodoController(completeTodoUseCase)

export default completeTodoController
