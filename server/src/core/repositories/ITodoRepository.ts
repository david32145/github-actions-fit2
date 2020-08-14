import ITodoModel from 'src/database/models/ITodoModel'

export default interface ITodoRepository {
  findAll(): Promise<ITodoModel[]>
  findByPk(pk: number): Promise<ITodoModel | undefined>
  create(todoModel: ITodoModel): Promise<ITodoModel>
  updateByPk(todoModel: ITodoModel, pk: number): Promise<ITodoModel>
}
