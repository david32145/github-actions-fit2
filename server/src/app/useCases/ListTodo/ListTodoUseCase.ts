import ITodoRepository from '../../../core/repositories/ITodoRepository'
import TodoMapper from '../../mapper/TodoMapper'
import { TodoDTO } from '../../dto/TodoDTO'

export default class CreateTodoUseCase {
  private todoRepository: ITodoRepository

  public constructor (todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  public async execute (): Promise<TodoDTO[]> {
    const todoList = await this.todoRepository.findAll()
    return todoList.map(TodoMapper.fromDomainToDTO)
  }
}
