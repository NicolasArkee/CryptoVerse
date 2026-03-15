import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from '@/models/Schema';
import { createDbConnection } from '@/utils/DBConnection';
import { Env } from './Env';

const globalForDb = globalThis as unknown as {
  drizzle: NodePgDatabase<typeof schema>;
};

const db = globalForDb.drizzle || createDbConnection();

if (Env.NODE_ENV !== 'production') {
  globalForDb.drizzle = db;
}

export { db };
