// src/db/utils.ts
import pool from './config';
import { readFileSync } from 'fs';
import { join } from 'path';

export const executeQuery = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};

export const initializeDatabase = async () => {
  try {
    const schemaSQL = readFileSync(
      join(process.cwd(), 'src', 'db', 'schema.sql'),
      'utf8'
    );
    await executeQuery(schemaSQL);
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

export const testConnection = async () => {
  try {
    const result = await executeQuery('SELECT NOW()');
    console.log('Database connection successful:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
};
