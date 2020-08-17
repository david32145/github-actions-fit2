import Todo from '../domain/Todo'
import { TodoDTO } from '../dto/TodoDTO'
import ITodoModel from '../../database/models/ITodoModel'

export default class TodoMapper {
  public static fromDomainToDTO (todo: Todo): TodoDTO {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    }
  }

  public static fromDTOToDomain (todoDTO: TodoDTO | Record<string, string | boolean | number>): Todo {
    return Todo.create(todoDTO.title as string, !!todoDTO.completed, todoDTO.id as number)
  }

  public static fromDomainToRepository (todo: Todo): ITodoModel {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed ? 1 : 0
    }
  }

  public static fromRepositoryToDomain (todoRepository: ITodoModel): Todo {
    return Todo.create(todoRepository.title, !!todoRepository.completed, todoRepository.id)
  }
}
