import ApiRestService from './ApiRESTService'

export interface Todo {
  id: number
  title: string
  completed?: boolean
}

class TodoService {
  public async index (): Promise<Todo[]> {
    const response = await ApiRestService.get<Todo[]>('/todos')
    return response.data
  }

  public async store (todo: string): Promise<Todo> {
    const response = await ApiRestService.post<Todo>('/todos', {
      title: todo
    })
    return response.data
  }

  public async done (todoId: number): Promise<void> {
    await ApiRestService.patch(`/todos/${todoId}/complete`, {
      completed: true
    })
  }

  public async destroy (todoId: number): Promise<void> {
    await ApiRestService.delete(`/todos/${todoId}`)
  }
}

export default new TodoService()
