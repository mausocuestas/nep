// src/db/test-connection.ts
import { db } from './index';
import { instituicoes } from './schema';

async function testConnection() {
  try {
    // Tenta fazer uma consulta simples
    const result = await db.select().from(instituicoes).limit(1);
    console.log('Conexão com o banco bem sucedida!');
    console.log('Resultado da consulta:', result);
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
  } finally {
    process.exit(0);
  }
}

testConnection();
