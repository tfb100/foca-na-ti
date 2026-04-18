import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function check() {
  const sql = postgres(process.env.DATABASE_URL!);
  const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
  console.log('Tabelas no schema public:', tables.map(t => t.table_name));
  process.exit(0);
}

check();
