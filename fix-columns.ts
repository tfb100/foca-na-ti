import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client);

async function main() {
  try {
    console.log("🛠️ Adicionando colunas faltantes na tabela 'profiles'...");
    
    await db.execute(sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS user_id UUID UNIQUE`);
    await db.execute(sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS display_name TEXT`);
    await db.execute(sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT FALSE NOT NULL`);
    
    console.log("✅ Colunas adicionadas com sucesso!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao adicionar colunas:", err);
    process.exit(1);
  }
}

main();
