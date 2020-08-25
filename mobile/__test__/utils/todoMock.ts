import {rest} from 'msw';
import {Todo} from '../../src/models/Todo';

let incrementsId = 0;
export const todoMock = {
  create: rest.post('http://localhost:3333/todos', (req, res, ctx) => {
    const {title} = req.body as Record<string, any>;
    incrementsId += 1;
    return res(ctx.json({id: incrementsId, title}));
  }),
  findAll: (todos?: Omit<Todo, 'completed'>[]) =>
    rest.get('http://localhost:3333/todos', (req, res, ctx) =>
      res(ctx.json(todos || [])),
    ),
  doneTodo: rest.patch(
    'http://localhost:3333/todos/:id/complete',
    (req, res, ctx) => res(ctx.json({})),
  ),
  destroy: rest.delete('http://localhost:3333/todos/:id', (req, res, ctx) =>
    res(ctx.json({})),
  ),
};
