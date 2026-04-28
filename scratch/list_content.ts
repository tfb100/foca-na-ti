require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });
const { db } = require("../src/lib/db");
const { categories, summaries } = require("../src/db/schema");

async function listContent() {
  try {
    const allCategories = await db.query.categories.findMany();
    const allSummaries = await db.query.summaries.findMany();
    
    console.log("Categories:", allCategories.map(c => c.name));
    console.log("Total Summaries:", allSummaries.length);
    
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

listContent();
