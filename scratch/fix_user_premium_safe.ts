require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });

const { createClient } = require('@supabase/supabase-js');
const { db } = require("../src/lib/db");
const { profiles } = require("../src/db/schema");
const { eq } = require("drizzle-orm");

async function fixUserWithLogin() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    const email = 'tfb100@gmail.com';
    const password = 'L3dzeppelinX1!';

    if (!supabaseUrl || !anonKey) {
      throw new Error("Supabase URL or Anon Key missing");
    }

    const supabase = createClient(supabaseUrl, anonKey);

    console.log(`Logging in as ${email}...`);
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (loginError) throw loginError;

    const user = data.user;
    console.log(`Logged in! User ID: ${user.id}`);

    // Check if profile exists
    const existingProfile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, user.id)
    });

    if (existingProfile) {
      console.log("Profile already exists. Updating to premium...");
      await db.update(profiles)
        .set({ isPremium: true, displayName: user.user_metadata?.full_name || 'Usuário Premium' })
        .where(eq(profiles.userId, user.id));
    } else {
      console.log("Profile missing. Creating premium profile...");
      await db.insert(profiles).values({
        userId: user.id,
        isPremium: true,
        displayName: user.user_metadata?.full_name || 'Usuário Premium',
        xp: 1000, // Dar um pouco de XP
        streak: 1
      });
    }

    console.log("Success! User is now Premium.");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing user:", error);
    process.exit(1);
  }
}

fixUserWithLogin();
