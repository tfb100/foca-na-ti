require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });
const postgres = require("postgres");

async function checkConstraints() {
  const sql = postgres(process.env.DATABASE_URL);
  try {
    const constraints = await sql`
      SELECT
          tc.constraint_name, tc.table_name, kcu.column_name, 
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name 
      FROM 
          information_schema.table_constraints AS tc 
          JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
          JOIN information_schema.constraint_column_usage AS ccu
            ON ccu.constraint_name = tc.constraint_name
      WHERE tc.table_name = 'profiles';
    `;
    console.log(JSON.stringify(constraints, null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

checkConstraints();
