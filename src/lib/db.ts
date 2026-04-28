import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const dbUrl = process.env.DATABASE_URL;
const isInvalidUrl = !dbUrl || dbUrl.includes("your-database-url");

const client = !isInvalidUrl ? postgres(dbUrl as string) : null;

let dbInstance: PostgresJsDatabase<typeof schema> | null = null;
if (client) {
  dbInstance = drizzle(client, { schema });
}

export const db = dbInstance || new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get() {
    throw new Error("Database URL is invalid or not configured. Cannot perform DB operations.");
  }
});
