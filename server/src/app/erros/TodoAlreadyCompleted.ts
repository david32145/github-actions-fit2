export default class TodoAlreadyCompleted extends Error {
  public constructor (id: number) {
    super(`Todo with id: ${id} already completed`)
    this.name = 'TodoAlreadyCompleted'
  }
}
