// src/db/test-connection.ts
import 'dotenv/config';
import { Pool } from 'pg';

async function testarConexao() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });

  try {
    const client = await pool.connect();
    const resultado = await client.query('SELECT NOW()');
    console.log('Conexão bem sucedida!');
    console.log('Hora do servidor:', resultado.rows[0].now);
    client.release();
  } catch (erro) {
    console.error('Erro ao conectar com o banco:', erro);
  } finally {
    await pool.end();
  }
}

testarConexao();
