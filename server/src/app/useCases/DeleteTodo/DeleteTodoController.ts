import { Request, Response } from 'express'
import DeleteTodoUseCase from './DeleteTodoUseCase'
import EntityNotFound from '../../erros/EntityNotFound'

export default class DeleteTodoController {
  private deleteTodoUseCase: DeleteTodoUseCase

  constructor (deleteTodoUseCase: DeleteTodoUseCase) {
    this.deleteTodoUseCase = deleteTodoUseCase
    this.handle = this.handle.bind(this)
  }

  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      await this.deleteTodoUseCase.execute(Number(request.params.id))
      return response.status(200).json()
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return response.status(400).json({
          error: 'EntityNotFound',
          message: err.message
        })
      }
      return response.status(500).send()
    }
  }
}
