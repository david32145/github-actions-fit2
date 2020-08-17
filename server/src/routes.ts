import { Router } from 'express'

import DeleteTodoController from './app/useCases/DeleteTodo'
import CreateTodoUseCase from './app/useCases/CreateTodo'
import CompleteTodoController from './app/useCases/CompleteTodo'
import ListTodoUseCase from './app/useCases/ListTodo'

const routes = Router()

routes.post('/todos', CreateTodoUseCase.handle)
routes.patch('/todos/:id/complete', CompleteTodoController.handle)
routes.get('/todos', ListTodoUseCase.handle)
routes.delete('/todos/:id', DeleteTodoController.handle)

export default routes
