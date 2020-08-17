import { Request, Response } from 'express'
import ListTodoUseCase from './ListTodoUseCase'

export default class ListTodoController {
  private listTodoUseCase: ListTodoUseCase

  constructor (listTodoUseCase: ListTodoUseCase) {
    this.listTodoUseCase = listTodoUseCase
    this.handle = this.handle.bind(this)
  }

  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const todoDTOList = await this.listTodoUseCase.execute()
      return response.status(200).json(todoDTOList)
    } catch (err) {
      return response.status(500).send()
    }
  }
}
