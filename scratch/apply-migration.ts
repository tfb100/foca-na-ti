import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

async function apply() {
  try {
    console.log('Applying migration manually (separate commands)...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS "study_logs" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "profile_id" uuid NOT NULL,
        "summary_id" uuid NOT NULL,
        "xp_earned" integer NOT NULL,
        "completed_at" timestamp with time zone DEFAULT now() NOT NULL
      )
    `;
    
    await sql`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='xp') THEN
          ALTER TABLE "profiles" ADD COLUMN "xp" integer DEFAULT 0 NOT NULL;
        END IF;
      END $$;
    `;

    await sql`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='streak') THEN
          ALTER TABLE "profiles" ADD COLUMN "streak" integer DEFAULT 0 NOT NULL;
        END IF;
      END $$;
    `;

    await sql`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='last_study_date') THEN
          ALTER TABLE "profiles" ADD COLUMN "last_study_date" timestamp with time zone;
        END IF;
      END $$;
    `;
    
    await sql`
      ALTER TABLE "study_logs" DROP CONSTRAINT IF EXISTS "study_logs_profile_id_profiles_id_fk"
    `;

    await sql`
      ALTER TABLE "study_logs" ADD CONSTRAINT "study_logs_profile_id_profiles_id_fk" 
      FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action
    `;

    await sql`
      ALTER TABLE "study_logs" DROP CONSTRAINT IF EXISTS "study_logs_summary_id_summaries_id_fk"
    `;

    await sql`
      ALTER TABLE "study_logs" ADD CONSTRAINT "study_logs_summary_id_summaries_id_fk" 
      FOREIGN KEY ("summary_id") REFERENCES "public"."summaries"("id") ON DELETE no action ON UPDATE no action
    `;

    console.log('Migration applied successfully!');
    process.exit(0);
  } catch (e) {
    console.error('Migration failed:', e);
    process.exit(1);
  }
}

apply();
