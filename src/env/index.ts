import { config } from 'dotenv';
import { z } from 'zod';

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' });
} else {
  config();
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite3', 'pg']),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
});

const { success: parseSuccess, error: parseError } = envSchema.safeParse(
  process.env
);

if (parseSuccess === false) {
  console.error('Invalid environment file! ❌\n', parseError.format());
  throw new Error('Invalid environment file!');
}

export const env = envSchema.parse(process.env);
