import Entity from '../../core/domain/Entity'
import TodoAlreadyCompleted from '../erros/TodoAlreadyCompleted'

export default class Todo extends Entity<number> {
  private _id?: number

  private _title: string
  private _completed: boolean

  private constructor (title: string, completed: boolean, id?: number) {
    super()
    this._id = id
    this._title = title
    this._completed = completed
  }

  public static create (title: string, completed: boolean, id?: number) {
    return new Todo(title, completed, id)
  }

  public complete (): void {
    if (this._completed) {
      throw new TodoAlreadyCompleted(this._id!)
    }
    this._completed = true
  }

  equals (otherEntity: Entity<number>): boolean {
    return otherEntity instanceof Todo && String(otherEntity.id) === String(this._id)
  }

  get id (): number {
    return this._id!
  }

  get title (): string {
    return this._title
  }

  get completed (): boolean {
    return this._completed
  }
}
