// src/db/test.ts
import { testConnection, initializeDatabase } from './utils';

async function runTests() {
  console.log('Testing database connection...');
  
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error('Failed to connect to database');
    return;
  }

  console.log('Initializing database schema...');
  const isInitialized = await initializeDatabase();
  if (!isInitialized) {
    console.error('Failed to initialize database');
    return;
  }

  console.log('All tests completed successfully!');
  process.exit(0);
}

runTests().catch(console.error);
