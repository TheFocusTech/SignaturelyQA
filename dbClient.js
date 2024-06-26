import { Client } from 'pg';
import { parse } from 'pg-connection-string';

export function createNewClient() {
    const connectionString = process.env.DB_DATA;
    const config = parse(connectionString);

    return new Client(config);
}