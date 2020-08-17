import ITodoRepository from '../../../core/repositories/ITodoRepository'
import EntityNotFound from '../../erros/EntityNotFound'

export default class DeleteTodoUseCase {
  private todoRepository: ITodoRepository
  public constructor (todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  public async execute (todoId: number): Promise<void> {
    const todo = await this.todoRepository.findByPk(todoId)
    if (todo !== undefined) {
      await this.todoRepository.deleteByPk(todoId)
      return
    }
    throw new EntityNotFound(`Todo with id ${todoId} not found`)
  }
}
