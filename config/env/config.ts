import { z } from 'zod';

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  JWT: z.object({
    JWT_SECRET: z.string({message : "JWT_SECRET is required"}),
    JWT_EXPIRES_IN: z.coerce.number().default(1000 * 60 * 60 * 24 ),
  }),
  DATABASE: z.object({
    URI: z.string({message : "MONGODB_URI is required"}),
  }),
})

export default configSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  JWT : {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  },
  DATABASE : {
    URI : process.env.MONGODB_URI
  }
});

