import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function check() {
  const sql = postgres(process.env.DATABASE_URL!);
  const columns = await sql`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'summaries'
  `;
  console.log('Colunas de summaries:', columns.map(c => c.column_name));
  process.exit(0);
}

check();
