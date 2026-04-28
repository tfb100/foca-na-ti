import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./src/db/schema";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function main() {
  try {
    console.log("🔍 Verificando tabela profiles...");
    const result = await db.execute(require("drizzle-orm").sql`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles')`);
    console.log("Resultado:", JSON.stringify(result));
    
    if (result[0].exists) {
      console.log("✅ Tabela 'profiles' existe.");
      const columns = await db.execute(require("drizzle-orm").sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'profiles'`);
      console.log("Colunas:", JSON.stringify(columns));
    } else {
      console.log("❌ Tabela 'profiles' NÃO existe!");
    }
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao verificar:", err);
    process.exit(1);
  }
}

main();
