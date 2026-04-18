import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const dbUrl = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === "production";

// Em desenvolvimento, se a URL for o placeholder ou estiver vazia, não inicializamos o cliente real
// para evitar o erro "Invalid URL" que trava o servidor.
const isInvalidUrl = !dbUrl || dbUrl.includes("your-database-url");

const client = !isInvalidUrl 
  ? postgres(dbUrl) 
  : null;

// @ts-ignore - Facilitar mock quando o banco não está pronto
export const db = client ? drizzle(client, { schema }) : null;
