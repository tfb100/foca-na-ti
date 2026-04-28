require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });
const postgres = require("postgres");

async function describeTable() {
  const sql = postgres(process.env.DATABASE_URL);
  try {
    const columns = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'profiles'
      ORDER BY ordinal_position;
    `;
    console.log(JSON.stringify(columns, null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

describeTable();
