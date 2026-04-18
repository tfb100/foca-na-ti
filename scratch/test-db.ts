import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
  console.log('Testando conexão com:', process.env.DATABASE_URL);
  const sql = postgres(process.env.DATABASE_URL!);
  try {
    const result = await sql`SELECT 1 as connected`;
    console.log('Conexão bem-sucedida:', result);
    process.exit(0);
  } catch (err) {
    console.error('Falha na conexão:', err);
    process.exit(1);
  }
}

test();
