import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'roster',
    password: 'postgres',
    port: 5432,
});

export let client = await pool.connect();
export const startConnection = async () => {
    client = await pool.connect();
}
export const closeConnection = () => {
    client.release();
}
