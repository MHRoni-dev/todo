import z from 'zod';

export const createUserSchema = z.object({
  username: z.string().trim().nonempty("Username is required"),
  password: z.string().trim().nonempty("Password is required").min(8, "Password must be at least 8 characters"),
})

export type CreateUser = z.infer<typeof createUserSchema>

export const loginUserSchema = z.object({
  username: z.string().trim().nonempty("Username is required"),
  password: z.string().trim().nonempty("Password is required").min(8, "Password must be at least 8 characters"),
})

export type LoginUser = z.infer<typeof loginUserSchema>

export const userSchema = createUserSchema.extend({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type User = z.infer<typeof userSchema>