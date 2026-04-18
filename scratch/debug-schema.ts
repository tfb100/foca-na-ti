import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function check() {
  const sql = postgres(process.env.DATABASE_URL!);
  const columns = await sql`
    SELECT table_name, column_name, data_type 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name IN ('summaries', 'categories')
    ORDER BY table_name, column_name
  `;
  console.log('Estrutura Detectada:');
  console.table(columns);
  process.exit(0);
}

check();
