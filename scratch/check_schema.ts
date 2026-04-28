import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function checkSchema() {
  const sql = postgres(process.env.DATABASE_URL!);
  const info = await sql`
    SELECT 
        column_name, 
        column_default, 
        is_nullable, 
        data_type 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    ORDER BY ordinal_position
  `;
  console.log(JSON.stringify(info, null, 2));
  await sql.end();
}

checkSchema();
