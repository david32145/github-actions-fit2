import Todo from '@app/domain/Todo'

export default interface ITodoRepository {
  findAll(): Promise<Todo[]>
  findByPk(pk: number): Promise<Todo | undefined>
  create(todo: Todo): Promise<Todo>
  updateByPk(todo: Todo, pk: number): Promise<Todo>
  deleteByPk(pk: number): Promise<void>
}
