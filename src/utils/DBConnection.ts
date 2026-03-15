import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Env } from '@/libs/Env';
import * as schema from '@/models/Schema';

export const createDbConnection = () => {
  const dbUrl = Env.DATABASE_URL ?? '';
  const pool = new Pool({
    connectionString: dbUrl,
    max: dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')
      ? 1
      : undefined,
  });

  return drizzle({
    client: pool,
    schema,
  });
};
