import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local.");
}

// Reuse the client across hot reloads / serverless invocations.
const globalForDb = globalThis as unknown as {
  __bookitSql?: ReturnType<typeof postgres>;
};

// `prepare: false` keeps us compatible with transaction-pooled connections
// (e.g. Neon's pooler / PgBouncer) used in production on Vercel.
const sql =
  globalForDb.__bookitSql ?? postgres(connectionString, { prepare: false });
if (process.env.NODE_ENV !== "production") globalForDb.__bookitSql = sql;

export const db = drizzle(sql, { schema });
export { schema };
