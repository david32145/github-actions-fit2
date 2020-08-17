import { Request, Response } from 'express'
import TodoAlreadyCompleted from '../../erros/TodoAlreadyCompleted'
import EntityNotFound from '../../erros/EntityNotFound'
import { CompleteTodoUseCase } from './CompleteTodoUseCase'

export class CompleteTodoController {
  private completeTodoUseCase: CompleteTodoUseCase

  constructor (completeTodoUseCase: CompleteTodoUseCase) {
    this.completeTodoUseCase = completeTodoUseCase
    this.handle = this.handle.bind(this)
  }

  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const todoDTO = await this.completeTodoUseCase.execute(Number(request.params.id))
      return response.status(200).json(todoDTO)
    } catch (err) {
      if (err instanceof TodoAlreadyCompleted) {
        return response.status(400).json({
          error: 'TodoAlreadyCompleted',
          message: err.message
        })
      }
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
