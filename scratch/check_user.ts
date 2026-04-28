require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });

const { db } = require("../src/lib/db");
const { profiles } = require("../src/db/schema");
const { eq } = require("drizzle-orm");

async function check() {
  try {
    const userEmail = 'tfb100@gmail.com';
    console.log(`Checking profile for ${userEmail}...`);
    
    const allProfiles = await db.query.profiles.findMany();
    console.log("Total profiles found:", allProfiles.length);
    console.log("Profiles list:", JSON.stringify(allProfiles, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error("Error checking user:", error);
    process.exit(1);
  }
}

check();
