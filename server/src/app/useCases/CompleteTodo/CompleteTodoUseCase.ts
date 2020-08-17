import ITodoRepository from '../../../core/repositories/ITodoRepository'
import TodoMapper from '../../mapper/TodoMapper'
import { TodoDTO } from '../../dto/TodoDTO'
import EntityNotFound from '../../erros/EntityNotFound'

export class CompleteTodoUseCase {
  private todoRepository: ITodoRepository

  public constructor (todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  public async execute (todoId: number): Promise<TodoDTO> {
    let todo = await this.todoRepository.findByPk(todoId)
    if (todo !== undefined) {
      todo.complete()
      todo = await this.todoRepository.updateByPk(todo, todoId)
      return TodoMapper.fromDomainToDTO(todo)
    }
    throw new EntityNotFound(`Todo with id ${todoId} not found`)
  }
}
