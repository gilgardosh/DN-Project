import { Client } from 'pg';

const connectionString = 'postgres://server:postgres@localhost:5432/dnproject';

export const database = new Client({
  connectionString: connectionString
});



