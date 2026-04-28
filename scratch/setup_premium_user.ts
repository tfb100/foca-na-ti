import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/db/schema";
import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

async function createPremiumTestUser() {
  const email = "premium@focanati.com";
  const password = "password123";
  const fullName = "Premium User Test";

  console.log("1. Creating Auth user...");
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
  
  // Note: We use public signUp because service role key might be broken
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  });

  if (authError) {
    if (authError.message.includes("already registered")) {
        console.log("User already exists in Auth.");
    } else {
        console.error("Auth error:", authError);
        return;
    }
  }

  // Get user ID (from signup or by logging in if already exists)
  let userId = authData.user?.id;
  if (!userId) {
    const { data: signInData } = await supabase.auth.signInWithPassword({ email, password });
    userId = signInData.user?.id;
  }

  if (!userId) {
    console.error("Could not get User ID.");
    return;
  }

  console.log(`User ID: ${userId}`);

  console.log("2. Creating/Updating Profile in DB...");
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client, { schema });

  try {
    await db.insert(schema.profiles).values({
      userId: userId,
      displayName: fullName,
      isPremium: true,
      xp: 1000,
      streak: 5
    }).onConflictDoUpdate({
      target: schema.profiles.userId,
      set: { isPremium: true, displayName: fullName }
    });

    console.log("✅ SUCCESS: Premium user created and profile updated!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  } catch (err) {
    console.error("DB Error:", err);
  } finally {
    await client.end();
  }
}

createPremiumTestUser();
