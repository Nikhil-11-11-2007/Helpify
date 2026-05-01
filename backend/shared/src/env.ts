import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGO_URI: z.string().optional(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  JWT_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),
  OPENROUTER_API_KEY: z.string().optional(),
  SENDGRID_API_KEY: z.string().optional(),
});

// This validates all env variables when the app starts
// If any required vars are missing, it throws immediately
export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
