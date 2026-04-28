require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });

const { createClient } = require('@supabase/supabase-js');
const { db } = require("../src/lib/db");
const { profiles } = require("../src/db/schema");
const { eq } = require("drizzle-orm");

async function fixUser() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const email = 'tfb100@gmail.com';

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase URL or Service Role Key missing");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    console.log(`Searching for user ${email}...`);
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) throw userError;

    const user = users.users.find(u => u.email === email);

    if (!user) {
      console.log(`User ${email} not found in auth.users.`);
      process.exit(1);
    }

    console.log(`Found user ID: ${user.id}`);

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
        xp: 0,
        streak: 0
      });
    }

    console.log("Success! User is now Premium.");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing user:", error);
    process.exit(1);
  }
}

fixUser();
