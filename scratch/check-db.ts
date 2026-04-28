import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

async function check() {
  try {
    const res = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'profiles'
    `;
    console.log('Columns in profiles:', res.map(c => c.column_name));
    
    const logs = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'study_logs'
    `;
    console.log('Table study_logs exists:', logs.length > 0);
    
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

check();
