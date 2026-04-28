const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL);

async function fix() {
  try {
    console.log('Iniciando correção de schema...');
    
    // Adicionar colunas se não existirem
    await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS user_id UUID UNIQUE`;
    await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS display_name TEXT`;
    await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT FALSE NOT NULL`;
    
    // Deletar colunas legadas que não estão no schema atual (opcional, mas limpa o erro de crash se houver confusão)
    // await sql`ALTER TABLE profiles DROP COLUMN IF EXISTS email`;
    // await sql`ALTER TABLE profiles DROP COLUMN IF EXISTS full_name`;
    
    console.log('✅ Banco de dados sincronizado!');
    process.exit(0);
  } catch (e) {
    console.error('❌ Erro fatal:', e);
    process.exit(1);
  }
}

fix();
