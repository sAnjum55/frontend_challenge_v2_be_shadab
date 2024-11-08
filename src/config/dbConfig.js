import pkg from 'pg'

const { Pool } = pkg
const connectionString = `postgresql://beam_dynamics_test_user:vBCtDrv1oEHo3FmREG9XbDO8eCrXNIEM@dpg-csn1drij1k6c73dq7850-a.singapore-postgres.render.com/beam_dynamics_test`;
const pool = new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false, 
    },
  });

export let client = await pool.connect();
export const startConnection = async () => {
    client = await pool.connect();
}
export const closeConnection = () => {
    client.release();
}
