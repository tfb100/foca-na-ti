import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function promoteRaw() {
  const email = "premium@focanati.com";
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return;

  const sql = postgres(dbUrl);

  try {
    console.log(`Buscando ID para ${email}...`);
    // O auth.users fica no schema 'auth' no Supabase
    const users = await sql`SELECT id FROM auth.users WHERE email = ${email}`;
    
    if (users.length === 0) {
      console.error("Usuário não encontrado no Auth. Crie-o primeiro via site ou script.");
      return;
    }

    const userId = users[0].id;
    console.log(`User ID encontrado: ${userId}`);

    console.log("Verificando perfil...");
    const profiles = await sql`SELECT * FROM public.profiles WHERE user_id = ${userId}`;
    
    if (profiles.length === 0) {
      console.log("Perfil não existe. Criando...");
      // Tentativa de insert 'cego' baseada na estrutura do erro anterior
      // O erro mostrou que a tabela tem muitas colunas. 
      // Vamos tentar o update se o perfil já existir, mas se não existe, o trigger deveria ter criado.
      // Se o trigger não criou, vamos forçar a criação com o mínimo necessário.
      await sql`
        INSERT INTO public.profiles (user_id, is_premium, display_name) 
        VALUES (${userId}, true, 'Premium User')
        ON CONFLICT (user_id) DO UPDATE SET is_premium = true
      `;
    } else {
      console.log("Perfil encontrado. Atualizando para Premium...");
      await sql`UPDATE public.profiles SET is_premium = true WHERE user_id = ${userId}`;
    }

    console.log("✅ Usuário agora é PREMIUM!");

  } catch (err) {
    console.error("Erro:", err);
  } finally {
    await sql.end();
  }
}

promoteRaw();
