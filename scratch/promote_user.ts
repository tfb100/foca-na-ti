import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/db/schema";
import * as dotenv from "dotenv";
import { eq } from "drizzle-orm";

dotenv.config({ path: ".env.local" });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}

const client = postgres(dbUrl);
const db = drizzle(client, { schema });

async function promoteUser(email: string) {
  console.log(`Buscando usuário por e-mail no Supabase...`);
  // Nota: Precisamos do user_id do Auth para encontrar o perfil
  // Mas como estamos no banco local, podemos tentar buscar direto no auth.users se tivermos acesso
  // Ou simplesmente listar os perfis e ver qual e-mail bate (se o perfil tiver e-mail)
  // No nosso schema, o perfil NÃO tem e-mail, apenas userId.
  
  // Vamos usar o Supabase Admin para pegar o ID pelo e-mail
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error("Erro ao listar usuários do Supabase:", error);
    process.exit(1);
  }

  const user = data.users.find(u => u.email === email);
  if (!user) {
    console.error(`Usuário com e-mail ${email} não encontrado.`);
    process.exit(1);
  }

  console.log(`Promovendo usuário ${email} (ID: ${user.id}) para Premium...`);

  const result = await db.update(schema.profiles)
    .set({ isPremium: true })
    .where(eq(schema.profiles.userId, user.id))
    .returning();

  if (result.length > 0) {
    console.log("✅ Usuário promovido com sucesso!");
    console.log(result[0]);
  } else {
    console.error("❌ Perfil não encontrado no banco de dados para este usuário.");
    console.log("Dica: O perfil é criado no primeiro login ou via trigger. Tente logar com ele uma vez primeiro.");
  }
  
  await client.end();
}

const emailToPromote = process.argv[2];
if (!emailToPromote) {
  console.log("Uso: npx tsx scratch/promote_user.ts <email>");
  process.exit(1);
}

promoteUser(emailToPromote);
