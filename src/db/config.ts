import { Pool } from "pg";

const poll = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

export default poll;
