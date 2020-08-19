import { Router } from 'express'

import DeleteTodoController from './app/useCases/DeleteTodo'
import CreateTodoController from './app/useCases/CreateTodo'
import CompleteTodoController from './app/useCases/CompleteTodo'
import ListTodoController from './app/useCases/ListTodo'

const routes = Router()

routes.post('/todos', CreateTodoController.handle)
routes.patch('/todos/:id/complete', CompleteTodoController.handle)
routes.get('/todos', ListTodoController.handle)
routes.delete('/todos/:id', DeleteTodoController.handle)

export default routes
