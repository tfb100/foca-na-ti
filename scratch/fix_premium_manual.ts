import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function fixPremium() {
  const email = "premium@focanati.com";
  const sql = postgres(process.env.DATABASE_URL!);

  try {
    const authUsers = await sql`SELECT id FROM auth.users WHERE email = ${email}`;
    if (authUsers.length === 0) {
      console.log("Crie o usuário premium@focanati.com primeiro.");
      return;
    }
    const userId = authUsers[0].id;

    console.log(`Inserindo perfil manualmente para ${userId}...`);
    // Usando colunas que descobrimos no checkSchema
    await sql`
      INSERT INTO public.profiles (id, user_id, display_name, is_premium, xp, streak, role)
      VALUES (${userId}, ${userId}, 'Premium User Test', true, 1000, 5, 'student')
      ON CONFLICT (id) DO UPDATE SET is_premium = true;
    `;

    console.log("✅ Sucesso! Usuário premium@focanati.com está pronto.");
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

fixPremium();
