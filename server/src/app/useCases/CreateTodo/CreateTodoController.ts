import { Request, Response } from 'express'
import CreateTodoUseCase from './CreateTodoUseCase'

export default class CreateTodoController {
  private createTodoUseCase: CreateTodoUseCase

  constructor (createTodoUseCase: CreateTodoUseCase) {
    this.createTodoUseCase = createTodoUseCase
    this.handle = this.handle.bind(this)
  }

  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const todoDTO = await this.createTodoUseCase.execute(request.body)
      return response.status(201).json(todoDTO)
    } catch (err) {
      return response.status(500).send()
    }
  }
}
