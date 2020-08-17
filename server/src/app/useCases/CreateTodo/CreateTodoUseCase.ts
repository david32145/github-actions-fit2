import ITodoRepository from '../../../core/repositories/ITodoRepository'
import TodoMapper from '../../mapper/TodoMapper'
import { TodoDTO } from '../../dto/TodoDTO'

export default class CreateTodoUseCase {
  private todoRepository: ITodoRepository

  public constructor (todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  public async execute (todoDTO: TodoDTO): Promise<TodoDTO> {
    const todo = TodoMapper.fromDTOToDomain(todoDTO)
    const createdTodo = await this.todoRepository.create(todo)
    return TodoMapper.fromDomainToDTO(createdTodo)
  }
}
