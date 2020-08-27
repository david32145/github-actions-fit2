import ITodoRepository from '../../core/repositories/ITodoRepository'
import Database from '../../database/Database'
import Todo from '../domain/Todo'
import ITodoModel from '../../database/models/ITodoModel'
import TodoMapper from '../mapper/TodoMapper'

class TodoRepository implements ITodoRepository {
  public async findAll (): Promise<Todo[]> {
    const todos = await Database<ITodoModel>('todos')
    return todos.map(TodoMapper.fromRepositoryToDomain)
  }

  public async findByPk (pk: number): Promise<Todo | undefined> {
    const result = await Database<ITodoModel>('todos').where('id', pk)
    if (result.length === 0) {
      return undefined
    }
    return TodoMapper.fromRepositoryToDomain(result[0])
  }

  public async create (todo: Todo): Promise<Todo> {
    const [todoId] = await Database<ITodoModel>('todos')
      .insert(TodoMapper.fromDomainToRepository(todo))
      .returning('id')
    const createdTodo = await this.findByPk(todoId as number)
    return createdTodo!
  }

  public async updateByPk (newTodo: Todo, pk: number): Promise<Todo> {
    const id = await Database<ITodoModel>('todos')
      .where('id', pk)
      .update(TodoMapper.fromDomainToRepository(newTodo))
    const todoUpdated = await this.findByPk(id)
    return todoUpdated!
  }

  public async deleteByPk (pk: number): Promise<void> {
    await Database('todos')
      .where('id', pk)
      .delete()
  }
}

export default new TodoRepository()
