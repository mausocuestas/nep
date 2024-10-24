// src/db/test-env.ts
import 'dotenv/config';

function testarEnv() {
  console.log('\nVerificando configuração das variáveis de ambiente...\n');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL não encontrada no arquivo .env');
    process.exit(1);
  }

  try {
    const url = new URL(process.env.DATABASE_URL);
    
    console.log('✅ DATABASE_URL encontrada');
    console.log('\nDetalhes da conexão:');
    console.log('Host:', url.hostname);
    console.log('Database:', url.pathname.replace('/', ''));
    console.log('Username:', url.username);
    console.log('SSL Mode:', url.searchParams.get('sslmode'));
    console.log('Password: ********');

    console.log('\n✅ Arquivo .env configurado corretamente!\n');
  } catch (error) {
    console.error('❌ Erro ao parser DATABASE_URL:', error);
    process.exit(1);
  }
}

testarEnv();
