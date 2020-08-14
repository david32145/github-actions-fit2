import ITodoRepository from '@core/repositories/ITodoRepository'
import ITodoModel from 'src/database/models/ITodoModel'
import Database from '@Database'

export default class TodoRepository implements ITodoRepository {
  public async findAll (): Promise<ITodoModel[]> {
    const todos = await Database<ITodoModel>('todos')
    return todos
  }

  public async findByPk (pk: number): Promise<ITodoModel | undefined> {
    const result = await Database<ITodoModel>('todos').where('id', pk)
    if (result.length === 0) {
      return undefined
    }
    return result[0]
  }

  public async create (todoModel: ITodoModel): Promise<ITodoModel> {
    const [todo] = await Database<ITodoModel>('todos')
      .insert(todoModel)
      .returning('*')
    return todo
  }

  public async updateByPk (todoModel: ITodoModel, pk: number): Promise<ITodoModel> {
    const [todo] = await Database<ITodoModel>('todos')
      .update(todoModel)
      .where('id', pk)
      .returning('*')
    return todo
  }
}
