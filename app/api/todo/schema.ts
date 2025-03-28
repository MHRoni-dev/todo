import {z} from 'zod';

export const createTodoSchema = z.object({
  title: z.string().trim().nonempty("Title is required"),
  completed: z.boolean().default(false).optional(),
})
export type CreateTodo = z.infer<typeof createTodoSchema>;


export const updateTodoSchema = createTodoSchema.partial().extend({
  order: z.number().optional(),
});
export type UpdateTodo = z.infer<typeof updateTodoSchema>;


export const fetchTodoSchema = createTodoSchema.extend({
  _id : z.string(),
  user: z.union([
    z.string(),
    z.object({
      _id: z.string(),
      username: z.string(),
    })
  ]),
  order: z.number(),
  createdAt : z.date(),
  updatedAt : z.date(),
})
export type Todo = z.infer<typeof fetchTodoSchema>;
