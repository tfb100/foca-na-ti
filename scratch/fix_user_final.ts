require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });
const postgres = require("postgres");

async function fixUserFinal() {
  const sql = postgres(process.env.DATABASE_URL);
  try {
    const email = 'tfb100@gmail.com';
    const password = 'L3dzeppelinX1!';
    
    // 1. Get userId from auth.users
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const userId = data.user.id;

    console.log(`Fixing profile for userId: ${userId}`);

    // 2. Delete existing
    await sql`DELETE FROM profiles WHERE user_id = ${userId} OR email = ${email} OR id = ${userId}`;

    // 3. Insert new profile where ID = USERID
    await sql`
      INSERT INTO profiles (
        id, email, full_name, role, xp, streak, user_id, display_name, is_premium
      ) VALUES (
        ${userId}, ${email}, 'Thiago Barcelos', 'student', 5000, 10, ${userId}, 'Thiago Barcelos', true
      )
    `;

    console.log("Success! Manual profile created with ID matching UserID and set to Premium.");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

fixUserFinal();
